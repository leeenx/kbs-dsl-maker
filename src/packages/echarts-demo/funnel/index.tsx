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
    backgroundColor: "#ffffff",
    tooltip: {
      trigger: 'item',
      formatter: "{a}\n{b} : {c}%"
    },
    legend: {
      orient: 'vertical',
      left: 10,
      data: ['展现', '点击', '访问', '咨询', '订单']
    },
    calculable: true,
    series: [
      {
        name: '漏斗图',
        type: 'funnel',
        width: '40%',
        height: '45%',
        left: '5%',
        top: '50%',
        data: [{ value: 100, name: '展现' },
        { value: 80, name: '点击' },
        { value: 60, name: '访问' },
        { value: 30, name: '咨询' },
        { value: 10, name: '订单' },

        ]
      },
      {
        name: '金字塔',
        type: 'funnel',
        width: '40%',
        height: '45%',
        left: '5%',
        top: '5%',
        sort: 'ascending',
        data: [
          { value: 60, name: '访问' },
          { value: 30, name: '咨询' },
          { value: 10, name: '订单' },
          { value: 80, name: '点击' },
          { value: 100, name: '展现' }
        ]
      },
      {
        name: '漏斗图',
        type: 'funnel',
        width: '40%',
        height: '45%',
        left: '55%',
        top: '5%',
        label: {
          normal: {
            position: 'left'
          }
        },
        data: [
          { value: 60, name: '访问' },
          { value: 30, name: '咨询' },
          { value: 10, name: '订单' },
          { value: 80, name: '点击' },
          { value: 100, name: '展现' }
        ]
      },
      {
        name: '金字塔',
        type: 'funnel',
        width: '40%',
        height: '45%',
        left: '55%',
        top: '50%',
        sort: 'ascending',
        label: {
          normal: {
            position: 'left'
          }
        },
        data: [
          { value: 60, name: '访问' },
          { value: 30, name: '咨询' },
          { value: 10, name: '订单' },
          { value: 80, name: '点击' },
          { value: 100, name: '展现' }
        ]
      }
    ]
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
        canvasId="mychart-funnel"
        ec={ec}
      />
    </div>
  );
});
