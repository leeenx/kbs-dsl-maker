const path = require('path');
const fs =require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

// 保留函数名
const ignoreFNames = [
  '_applyDecoratedDescriptor',
  '_applyDecs',
  '_applyDecs2203',
  '_applyDecs2203R',
  '_applyDecs2301',
  '_applyDecs2305',
  '_arrayLikeToArray',
  '_arrayWithHoles',
  '_arrayWithoutHoles',
  '_assertThisInitialized',
  '_AsyncGenerator',
  '_asyncGeneratorDelegate',
  '_asyncIterator',
  '_asyncToGenerator',
  '_awaitAsyncGenerator',
  '_AwaitValue',
  '_checkInRHS',
  '_checkPrivateRedeclaration',
  '_classApplyDescriptorDestructureSet',
  '_classApplyDescriptorGet',
  '_classApplyDescriptorSet',
  '_classCallCheck',
  '_classCheckPrivateStaticAccess',
  '_classCheckPrivateStaticFieldDescriptor',
  '_classExtractFieldDescriptor',
  '_classNameTDZError',
  '_classPrivateFieldDestructureSet',
  '_classPrivateFieldGet',
  '_classPrivateFieldInitSpec',
  '_classPrivateFieldLooseBase',
  '_classPrivateFieldLooseKey',
  '_classPrivateFieldSet',
  '_classPrivateMethodGet',
  '_classPrivateMethodInitSpec',
  '_classPrivateMethodSet',
  '_classStaticPrivateFieldDestructureSet',
  '_classStaticPrivateFieldSpecGet',
  '_classStaticPrivateFieldSpecSet',
  '_classStaticPrivateMethodGet',
  '_classStaticPrivateMethodSet',
  '_construct',
  '_createClass',
  '_createForOfIteratorHelper',
  '_createForOfIteratorHelperLoose',
  '_createSuper',
  '_decorate',
  '_defaults',
  '_defineAccessor',
  '_defineEnumerableProperties',
  '_defineProperty',
  '_dispose',
  '_extends',
  '_get',
  '_getPrototypeOf',
  '_identity',
  '_inherits',
  '_inheritsLoose',
  '_initializerDefineProperty',
  '_initializerWarningHelper',
  '_instanceof',
  '_interopRequireDefault',
  '_interopRequireWildcard',
  '_isNativeFunction',
  '_isNativeReflectConstruct',
  '_iterableToArray',
  '_iterableToArrayLimit',
  '_iterableToArrayLimitLoose',
  '_jsx',
  '_maybeArrayLike',
  '_newArrowCheck',
  '_nonIterableRest',
  '_nonIterableSpread',
  '_objectDestructuringEmpty',
  '_objectSpread',
  '_objectSpread2',
  '_objectWithoutProperties',
  '_objectWithoutPropertiesLoose',
  '_OverloadYield',
  '_possibleConstructorReturn',
  '_readOnlyError',
  '_regeneratorRuntime',
  '_set',
  '_setPrototypeOf',
  '_skipFirstGeneratorNext',
  '_slicedToArray',
  '_slicedToArrayLoose',
  '_superPropBase',
  '_taggedTemplateLiteral',
  '_taggedTemplateLiteralLoose',
  '_tdz',
  '_temporalRef',
  '_temporalUndefined',
  '_toArray',
  '_toConsumableArray',
  '_toPrimitive',
  '_toPropertyKey',
  '_typeof',
  '_unsupportedIterableToArray',
  '_using',
  '_wrapAsyncGenerator',
  '_wrapNativeSuper',
  '_wrapRegExp',
  '_writeOnlyError',
];

const KbsDslParserPlugin = require('kbs-dsl-parser');

// 默认插件列表，不包含 mpa
const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: './src/index.html',
    scriptLoading: 'blocking',
    chunks: ['index']
  })
];

/**
 * MPA 配置
 * ./src/pages 为 MPA 目录 
 */
const mpaDir = path.resolve(__dirname, './src/pages');
const mapEntries = {};
if (fs.existsSync(mpaDir)) {
  const dirs = fs.readdirSync(mpaDir);
  dirs.forEach(item => {
    const itemPath = path.resolve(mpaDir, item);
    if (fs.statSync(itemPath).isDirectory()) {
      // 只取目录
      mapEntries[item] = `./src/pages/${item}`;
      // plugins 加入 mpa 的 html 模板
      plugins.push(
        new HtmlWebpackPlugin({
          template: './src/index.html',
          scriptLoading: 'blocking',
          filename: `${item}/index.html`,
          chunks: [item]
        })
      );
    }
  });
}

// plugins 追加 dsl 格式化插件
plugins.push(
  new KbsDslParserPlugin({
    compress: process.env.COMPRESS === 'yes',
    ignoreFNames,
    watch: process.env.COMPRESS !== 'yes'
  })
);

module.exports = {
  mode: 'production', // development | production | none
  entry: Object.assign(
    {
      index: './src/index.tsx'
    },
    mapEntries
  ),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[chunkhash].js', // 使用 chunkhash 是为了优化 mpa
    libraryTarget: 'umd',
    library: 'app',
    environment: {
      arrowFunction: false
    }
  },
  optimization: {
    minimize: process.env.COMPRESS === 'yes',
    minimizer: [new TerserPlugin({
      terserOptions: {
        keep_fnames: new RegExp(ignoreFNames.join('|'))
      }
    })]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.wasm'],
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
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      root: 'React'
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      root: 'ReactDOM'
    },
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      root: '_'
    }
  },
  plugins,
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