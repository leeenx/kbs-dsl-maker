import React, { memo, useMemo } from "react";
import { useMemoizedFn } from "ahooks";
import { Button } from "../../base-components";

import Bar from './bar';
import Scatter from "./scatter";
import Pie from "./pie";
import Line from "./line";
import Funnel from './funnel';
import Gauge from './gauge';
import K from './k';
import Radar from './radar';
import Heatmap from './heatmap';
import Tree from './tree';
import Treemap from './treemap';
import Sunburst from './sunburst';
import Map from './map';
import Graph from './graph';
import Boxplot from './boxplot';
import Parallel from './parallel';
import Sankey from './sankey';
import ThemeRiver from './themeRiver';
import LazyLoad from './lazyLoad';
import MultiCharts from './multiCharts';
import Move from './move';
import SaveCanvas from './saveCanvas';
import LoadImage from './loadImage';

import css from './index.css';

export default memo(() => {
  const baseChartList = useMemo(() => [
    {
      icon: require('../../images/icons/bar.png'),
      title: '柱状图',
      name: 'bar'
    },
    {
      icon: require('../../images/icons/scatter.png'),
      title: '散点图',
      name: 'scatter'
    },
    {
      icon: require('../../images/icons/pie.png'),
      title: '饼图',
      name: 'pie'
    },
    {
      icon: require('../../images/icons/line.png'),
      title: '折线图',
      name: 'line'
    },
    {
      icon: require('../../images/icons/funnel.png'),
      title: '漏斗图',
      name: 'funnel'
    },
    {
      icon: require('../../images/icons/gauge.png'),
      title: '仪表盘',
      name: 'gauge'
    },
    {
      icon: require('../../images/icons/k.png'),
      title: 'K 线图',
      name: 'k'
    },
    {
      icon: require('../../images/icons/radar.png'),
      title: '雷达图',
      name: 'radar'
    },
    {
      icon: require('../../images/icons/heatmap.png'),
      title: '热力图',
      name: 'heatmap'
    },
    {
      icon: require('../../images/icons/tree.png'),
      title: '树图',
      name: 'tree'
    },
    {
      icon: require('../../images/icons/treemap.png'),
      title: '矩形树图',
      name: 'treemap'
    },
    {
      icon: require('../../images/icons/sunburst.png'),
      title: '旭日图',
      name: 'sunburst'
    },
    {
      icon: require('../../images/icons/map.png'),
      title: '地图',
      name: 'map'
    },
    {
      icon: require('../../images/icons/graph.png'),
      title: '关系图',
      name: 'graph'
    },
    {
      icon: require('../../images/icons/boxplot.png'),
      title: '箱型图',
      name: 'boxplot'
    },
    {
      icon: require('../../images/icons/parallel.png'),
      title: '平行坐标图',
      name: 'parallel'
    },
    {
      icon: require('../../images/icons/sankey.png'),
      title: '桑基图',
      name: 'sankey'
    },
    {
      icon: require('../../images/icons/themeRiver.png'),
      title: '河流图',
      name: 'themeRiver'
    },
  ], []);

  const advanceChartList = useMemo(() => [
    { title: '延迟加载图表', name: 'lazyLoad' },
    { title: '一个页面中多个图表', name: 'multiCharts' },
    { title: '页面不阻塞滚动', name: 'move' },
    { title: '保存 Canvas 到本地文件', name: 'saveCanvas' },
    { title: '加载图片', name: 'loadImage' },
  ], []);

  const handleItemClick = useMemoizedFn((name: string) => {
    navigate('/echarts-demo', { page: name });
  });

  return (
    <div className="pannel">
      <div style={css.grid} className="grid">
        {
          baseChartList.map((item, index) => (
            <div style={css.item(index)} key={`${index}`} onClick={() => handleItemClick(item.name)}>
              <div style={css.poster}>
                <img src={item.icon} style={css.image} />
              </div>
              <div style={css.text}>{item.title}</div>
            </div>
          ))
        }
      </div>
      <div style={css.list} className="list">
        {
          advanceChartList.map((item, index) => (
            <Button
              key={`${index}`}
              className="button"
              style={css.button}
              onClick={() => handleItemClick(item.name)}>
              {item.title}
            </Button>
          ))
        }
      </div>
    </div>
  );
});

export {
  Bar,
  Scatter,
  Pie,
  Line,
  Funnel,
  Gauge,
  K,
  Radar,
  Heatmap,
  Tree,
  Treemap,
  Sunburst,
  Map,
  Graph,
  Boxplot,
  Parallel,
  Sankey,
  ThemeRiver,
  LazyLoad,
  MultiCharts,
  Move,
  SaveCanvas,
  LoadImage,
};
