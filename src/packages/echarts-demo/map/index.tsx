import React, { memo, useMemo } from "react";
import EcCanvas from "../../../components/ec-canvas";
//@ts-ignore
import * as echarts from '../../../components/ec-canvas/echarts.3rd';
import { useShareAppMessage } from "../../../utils";
import geoJson from './mapData.js';

let chart: any = null;

function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);
  echarts.registerMap('henan', geoJson);

  const option = {
    animation: false,
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}'
    },

    visualMap: {
      min: 0,
      max: 100,
      left: 'left',
      top: 'bottom',
      text: ['高', '低'], // 文本，默认为数值文本
      calculable: true
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {}
      }
    },
    series: [{
      type: 'map',
      mapType: 'henan',
      label: {
        normal: {
          show: true
        },
        emphasis: {
          textStyle: {
            color: '#fff'
          }
        }
      },
      itemStyle: {

        normal: {
          borderColor: '#389BB7',
          areaColor: '#fff',
        },
        emphasis: {
          areaColor: '#389BB7',
          borderWidth: 0
        }
      },
      animation: false,

      data: [
        { name: '郑州市', value: 100 },
        { name: '洛阳市', value: 10 },
        { name: '开封市', value: 20 },
        { name: '信阳市', value: 30 },
        { name: '驻马店市', value: 40 },
        { name: '南阳市', value: 41 },
        { name: '周口市', value: 15 },
        { name: '许昌市', value: 25 },
        { name: '平顶山市', value: 35 },
        { name: '新乡市', value: 35 },
        { name: '漯河市', value: 35 },
        { name: '商丘市', value: 35 },
        { name: '三门峡市', value: 35 },
        { name: '济源市', value: 35 },
        { name: '焦作市', value: 35 },
        { name: '安阳市', value: 35 },
        { name: '鹤壁市', value: 35 },
        { name: '濮阳市', value: 35 },
        { name: '开封市', value: 45 }
      ]

    }],

  };

  const start = Date.now();
  chart.setOption(option);
  console.log('----- 注册耗时', Date.now() - start);
  return chart;
}

export default memo(() => {
  const ec = useMemo(() => ({ onInit: initChart }), []);
  useShareAppMessage(() => ({
    title: 'ECharts 在 web 分包中的使用',
    success: function () { },
    fail: function () { }
  }));
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <EcCanvas
        canvasId="mychart-map"
        ec={ec}
      />
    </div>
  );
});