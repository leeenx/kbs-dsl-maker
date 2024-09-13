import React, { memo, useMemo } from "react";
import EcCanvas from "../../../components/ec-canvas";
//@ts-ignore
import * as echarts from '../../../components/ec-canvas/echarts.3rd';
import { useShareAppMessage } from "../../../utils";

let chart: any = null;

function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  const option = {
    series: {
      type: 'sankey',
      layout: 'none',
      data: [{
        name: 'a'
      }, {
        name: 'b'
      }, {
        name: 'a1'
      }, {
        name: 'a2'
      }, {
        name: 'b1'
      }, {
        name: 'c'
      }, {
        name: 'd'
      }, {
        name: 'd1'
      }, {
        name: 'd2'
      }, {
        name: 'd3'
      }],
      links: [{
        source: 'a',
        target: 'a1',
        value: 5
      }, {
        source: 'a',
        target: 'a2',
        value: 3
      }, {
        source: 'b',
        target: 'b1',
        value: 8
      }, {
        source: 'a',
        target: 'b1',
        value: 3
      }, {
        source: 'b1',
        target: 'a1',
        value: 1
      }, {
        source: 'd',
        target: 'a2',
        value: 1
      }, {
        source: 'd',
        target: 'c',
        value: 1
      }, {
        source: 'd1',
        target: 'c',
        value: 2
      }, {
        source: 'd2',
        target: 'c',
        value: 2
      }, {
        source: 'd',
        target: 'd3',
        value: 4
      }, {
        source: 'd2',
        target: 'd3',
        value: 1
      }]
    }
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
        canvasId="mychart-sankey"
        ec={ec}
      />
    </div>
  );
});
