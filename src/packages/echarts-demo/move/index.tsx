import React, { memo, useMemo } from "react";
import EcCanvas from "../../../components/ec-canvas";
//@ts-ignore
import * as echarts from '../../../components/ec-canvas/echarts.3rd';
import { useShareAppMessage } from "../../../utils";

function getBarOption() {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: ['热度', '正面', '负面']
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    xAxis: [
      {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['汽车之家', '今日头条', '百度贴吧', '一点资讯', '微信', '微博', '知乎'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    series: [
      {
        name: '热度',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        data: [300, 270, 340, 344, 300, 320, 310]
      },
      {
        name: '正面',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true
          }
        },
        data: [120, 102, 141, 174, 190, 250, 220]
      },
      {
        name: '负面',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'left'
          }
        },
        data: [-20, -32, -21, -34, -90, -130, -110]
      }
    ]
  };
}

export default memo(() => {
  const ec = useMemo(() => ({
    onInit: function (canvas, width, height, dpr) {
      const barChart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
      });
      canvas.setChart(barChart);
      barChart.setOption(getBarOption());

      return barChart;
    }
  }), []);
  useShareAppMessage(() => ({
    title: 'ECharts 在 web 分包中的使用',
    success: function () { },
    fail: function () { }
  }));

  const css = {
    wrap: {},
    canvas: {
      width: '70%',
      height: '300px',
      margin: '20px 15%',
      border: '1px solid red',
      display: 'block'
    },
    text: {
      display: 'block',
      margin: '10px',
      cursor: 'text'
    },
    p: {
      marginBottom: '20px'
    }
  };

  return (
    <div className="move-container" style={css.wrap}>
      <div className="move-canvas" style={css.canvas}>
        <EcCanvas canvasId="mychart-move-bar" ec={ec} />
      </div>
      <div className="p" style={css.p}>
        <div className="text" style={css.text}>这是一个展示页面不被图表阻塞的例子</div>
        <div className="text" style={css.text}>在图表区域（红色边框）之外可以滚动</div>
      </div>
      <div className="p" style={css.p}>
        <div className="text" style={css.text}>这是一个展示页面不被图表阻塞的例子</div>
        <div className="text" style={css.text}>在图表区域（红色边框）之外可以滚动</div>
      </div>
      <div className="p" style={css.p}>
        <div className="text" style={css.text}>这是一个展示页面不被图表阻塞的例子</div>
        <div className="text" style={css.text}>在图表区域（红色边框）之外可以滚动</div>
      </div>
      <div className="p" style={css.p}>
        <div className="text" style={css.text}>这是一个展示页面不被图表阻塞的例子</div>
        <div className="text" style={css.text}>在图表区域（红色边框）之外可以滚动</div>
      </div>
      <div className="p" style={css.p}>
        <div className="text" style={css.text}>这是一个展示页面不被图表阻塞的例子</div>
        <div className="text" style={css.text}>在图表区域（红色边框）之外可以滚动</div>
      </div>
      <div className="p" style={css.p}>
        <div className="text" style={css.text}>这是一个展示页面不被图表阻塞的例子</div>
        <div className="text" style={css.text}>在图表区域（红色边框）之外可以滚动</div>
      </div>
      <div className="p" style={css.p}>
        <div className="text" style={css.text}>这是一个展示页面不被图表阻塞的例子</div>
        <div className="text" style={css.text}>在图表区域（红色边框）之外可以滚动</div>
      </div>
    </div>
  );
});
