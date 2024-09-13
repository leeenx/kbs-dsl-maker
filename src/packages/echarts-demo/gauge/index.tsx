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
    series: [{
      name: '业务指标',
      type: 'gauge',
      detail: {
        formatter: '{value}%'
      },
      axisLine: {
        show: true
      },
      data: [{
        value: 40,
        name: '完成率',
      }]

    }]
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
        canvasId="mychart-gauge"
        ec={ec}
      />
    </div>
  );
});
