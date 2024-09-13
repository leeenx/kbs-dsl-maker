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

  const item1 = {
    color: '#F54F4A'
  };
  const item2 = {
    color: '#FF8C75'
  };
  const item3 = {
    color: '#FFB499'
  };

  const data = [{
    children: [{
      value: 5,
      children: [{
        value: 1,
        itemStyle: item1
      }, {
        value: 2
      }, {
        value: 1
      }],
      itemStyle: item1
    }, {
      value: 10,
      children: [{
        value: 6,
        itemStyle: item3
      }, {
        value: 2,
        itemStyle: item3
      }, {
        value: 1
      }],
      itemStyle: item1
    }],
    itemStyle: item1
  }, {
    value: 9,
    children: [{
      value: 4,
      children: [{
        value: 2,
        itemStyle: item2
      }],
      itemStyle: item1
    }, {
      children: [{
        value: 3
      }],
      itemStyle: item3
    }],
    itemStyle: item2
  }, {
    value: 7,
    children: [{
      children: [{
        value: 1,
        itemStyle: item3
      }, {
        value: 3,
        itemStyle: item2
      }, {
        value: 2,
        itemStyle: item1
      }],
      itemStyle: item3
    }],
    itemStyle: item1
  }, {
    children: [{
      value: 6,
      children: [{
        value: 1,
        itemStyle: item2
      }, {
        value: 2,
        itemStyle: item1
      }, {
        value: 1,
        itemStyle: item3
      }],
      itemStyle: item3
    }, {
      value: 3,
      children: [{
        value: 1,
      }, {
        value: 1,
        itemStyle: item2
      }, {
        value: 1
      }],
      itemStyle: item3
    }],
    itemStyle: item1
  }];

  const option = {
    series: {
      radius: ['15%', '80%'],
      type: 'sunburst',
      sort: null,
      highlightPolicy: 'ancestor',
      data: data,
      label: {
        rotate: 'radial'
      },
      levels: [],
      itemStyle: {
        color: '#ddd',
        borderWidth: 2
      }
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
        canvasId="mychart-sunburst"
        ec={ec}
      />
    </div>
  );
});
