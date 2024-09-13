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
    xAxis: {
      show: false
    },
    yAxis: {
      show: false
    },
    radar: {
      // shape: 'circle',
      indicator: [{
        name: '食品',
        max: 500
      },
      {
        name: '玩具',
        max: 500
      },
      {
        name: '服饰',
        max: 500
      },
      {
        name: '绘本',
        max: 500
      },
      {
        name: '医疗',
        max: 500
      },
      {
        name: '门票',
        max: 500
      }
      ]
    },
    series: [{
      name: '预算 vs 开销',
      type: 'radar',
      data: [{
        value: [430, 340, 500, 300, 490, 400],
        name: '预算'
      },
      {
        value: [300, 430, 150, 300, 420, 250],
        name: '开销'
      }
      ]
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
        canvasId="mychart-radar"
        ec={ec}
      />
    </div>
  );
});
