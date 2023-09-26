const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const { webpack, Compilation } = require('webpack');

class KbsDslParserPlugin {
  apply(compiler) {
    // compiler.hooks.entryOption.tap('MyPlugin', (context, entry) => {
    //   console.log('++++++++++++++++', entry.index.import);
    // });
    compiler.hooks.thisCompilation.tap('KbsDslParserPlugin', (compilation) => {
      // compilation.hooks.finishModules.tap(
      //   'KbsDslParserPlugin',
      //   (modules) => {
      //     console.log('-------------');
      //     // console.log({ modules, records });
      //     // console.log('======chunks',chunks);
      //     // module.resource ? console.log('module.resource:', module.resource) : console.log('module: ', module);
      //   }
      // );
      compilation.hooks.processAssets.tap(
        {
          name: 'MyPlugin',
          stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL, // see below for more stages
        },
        (assets) => {
          console.log('List of assets and their sizes:');
          Object.entries(assets).forEach(([pathname, source]) => {
            // console.log('++++++++source:', source);
            console.log(`— ${pathname}: ${source.size()} bytes`);
          });
        }
      );
    });
    compiler.hooks.afterCompile.tap('KbsDslParserPlugin', (compilation) => {
      const name = `index.${compilation.hash}`;
      const asset = compilation.assets[`${name}.js`];
      if (asset) {
        // 找到资源
        const realAsset = asset._children ? asset._children[1] : asset;
        const code = realAsset._cachedSource || realAsset._originalSourceAsString;
        const ast = require("@babel/parser").parse(code);
        const dsl = require('./dsl-parser').parser(ast);
        const rowSource = new compiler.webpack.sources.RawSource(JSON.stringify(dsl));
        compilation.emitAsset(`index.${compilation.hash}.dsl.json`, rowSource);
      }
    });
  }
}

module.exports = {
  mode: 'production', // development | production | none
  entry: {
    index: './src/index.tsx'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[hash].js',
    libraryTarget: 'umd',
    library: 'app',
    environment: {
      arrowFunction: false
    }
  },
  optimization: {
    minimize: false,
    minimizer: [new TerserPlugin({
      terserOptions: {
        keep_fnames: /_defineProperty/
      }
    })]
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  "useBuiltIns": "usage",
                  "corejs": "3"
                }
              ],
              "@babel/preset-react",
              "@babel/preset-typescript"
            ],
            "plugins": [
              "@babel/plugin-transform-runtime"
            ]
          }
        },
        exclude: /node_modules/, //排除 node_modules 目录
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|json)$/i,
        exclude: /node_modules/,
        type: 'asset/resource',
        parser: {
          dataurlCondition: {
            maxSize: 8192
          }
        }
      }
    ],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html', scriptLoading: 'blocking' }),
    new KbsDslParserPlugin()
  ],
  performance: {
    maxAssetSize: 20000000, // 整数类型（以字节为单位）
	  maxEntrypointSize: 400000, // 整数类型（以字节为单位）
  },
  devServer: {
    compress: true,
    hot: false,
    client: false,
    port: 9000,
  }
}