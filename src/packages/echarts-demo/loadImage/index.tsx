import React, { memo, useMemo } from "react";
import EcCanvas from "../../../components/ec-canvas";
//@ts-ignore
import * as echarts from '../../../components/ec-canvas/echarts.3rd';
import { useShareAppMessage } from "../../../utils";

let chart: any = null;

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  const piePatternSrc = require('../../../images/pie-pattern.jpg'); // '/img/pie-pattern.jpg';
  const bgPatternSrc = require('../../../images/pie-bg.png'); // '/img/pie-bg.png';

  var option = {
    backgroundColor: {
      image: bgPatternSrc,
      repeat: 'repeat'
    },
    title: {
      text: '加载图片',
      textStyle: {
        color: '#235894'
      }
    },
    tooltip: {},
    series: [
      {
        name: 'pie',
        type: 'pie',
        selectedMode: 'single',
        selectedOffset: 30,
        clockwise: true,
        label: {
          fontSize: 18,
          color: '#235894'
        },
        labelLine: {
          lineStyle: {
            color: '#235894'
          }
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ],
        itemStyle: {
          opacity: 0.7,
          color: {
            image: piePatternSrc,
            repeat: 'repeat'
          },
          borderWidth: 3,
          borderColor: '#235894'
        }
      }
    ]
  };

  chart.setOption(option);
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
        canvasId="mychart-bar"
        ec={ec}
      />
    </div>
  );
});
