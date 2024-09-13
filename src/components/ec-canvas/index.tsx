import React, { memo, useEffect, useState,  forwardRef, useMemo, useImperativeHandle } from 'react';
import { useMemoizedFn } from 'ahooks';
import * as _ from "lodash";

import WxCanvas from './wx-canvas';
//@ts-ignore
import * as echarts from './echarts.3rd';

let ctx;

function compareVersion(v1, v2) {
  v1 = v1.split('.')
  v2 = v2.split('.')
  const len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i])
    const num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }
  return 0
}

function wrapTouch(event) {
  for (let i = 0; i < event.touches.length; ++i) {
    const touch = event.touches[i];
    touch.offsetX = touch.x;
    touch.offsetY = touch.y;
  }
  return event;
}

type Init = (canvas: any, width, height, dpr) => any;

interface EC {
  onInit?: Init;
  lazyLoad?: boolean;
}

interface Props {
  canvasId: string;
  ec?: EC;
  forceUseOldCanvas?: boolean;
  onInit?: Init;
}

export default memo(forwardRef((({
  canvasId = 'ec-canvas',
  ec,
  forceUseOldCanvas = false,
  onInit = _.noop,
}: Props, ref) => {
  const [data, setData] = useState({
    isUseNewCanvas: true,
  });
  const that = useMemo<any>(() => ({}), []);
  const initByNewWay = useMemoizedFn((callback?: Init) => {
    // version >= 2.9.0：使用新的方式初始化
    const thisPointer = getThisPointer();
    const query = wx.createSelectorQuery().in(thisPointer);
    query
      .select(`#${canvasId}`)
      .fields({ node: true, size: true })
      .exec(res => {
        const canvasNode = res[0].node
        that.canvasNode = canvasNode

        const canvasDpr = wx.getSystemInfoSync().pixelRatio
        const canvasWidth = res[0].width
        const canvasHeight = res[0].height

        const ctx = canvasNode.getContext('2d')

        const canvas = new WxCanvas(ctx, canvasId, true, canvasNode)
        if (echarts.setPlatformAPI) {
          echarts.setPlatformAPI({
            createCanvas: () => canvas,
            loadImage: (src, onload, onerror) => {
              if (canvasNode.createImage) {
                const image = canvasNode.createImage();
                image.onload = onload;
                image.onerror = onerror;
                image.src = src;
                return image;
              }
              console.error('加载图片依赖 `Canvas.createImage()` API，要求小程序基础库版本在 2.7.0 及以上。');
              // PENDING fallback?
            }
          })
        } else {
          echarts.setCanvasCreator(() => canvas)
        }

        if (typeof callback === 'function') {
          that.chart = callback(canvas, canvasWidth, canvasHeight, canvasDpr)
        } else if (ec && typeof ec.onInit === 'function') {
          that.chart = ec.onInit(canvas, canvasWidth, canvasHeight, canvasDpr)
        }
        onInit?.(canvas, canvasWidth, canvasHeight, canvasDpr);
      })
  });

  const initByOldWay = useMemoizedFn((callback?: Init) => {
    // 1.9.91 <= version < 2.9.0：原来的方式初始化
    const thisPointer = getThisPointer();
    ctx = wx.createCanvasContext(canvasId, thisPointer);
    //@ts-ignore
    const canvas = new WxCanvas(ctx, canvasId, false);

    if (echarts.setPlatformAPI) {
      echarts.setPlatformAPI({
        createCanvas: () => canvas,
      });
    } else {
      echarts.setCanvasCreator(() => canvas);
    };
    // const canvasDpr = wx.getSystemInfoSync().pixelRatio // 微信旧的canvas不能传入dpr
    const canvasDpr = 1;
    const query = wx.createSelectorQuery().in(thisPointer);
    query.select(`#${canvasId}`).boundingClientRect(res => {
      if (typeof callback === 'function') {
        that.chart = callback(canvas, res.width, res.height, canvasDpr);
      }
      else if (ec && typeof ec.onInit === 'function') {
        that.chart = ec.onInit(canvas, res.width, res.height, canvasDpr);
      }
      onInit?.(canvas, res.width, res.height, canvasDpr);

    }).exec();
  });

  const canvasToTempFilePath = (opt: any) => {
    if (data.isUseNewCanvas) {
      // 新版
      const thisPointer = getThisPointer();
      const query = wx.createSelectorQuery().in(thisPointer);
      query
        .select(`#${canvasId}`)
        .fields({ node: true, size: true })
        .exec(res => {
          const canvasNode = res[0].node
          opt.canvas = canvasNode
          wx.canvasToTempFilePath(opt)
        })
    } else {
      // 旧的
      if (!opt.canvasId) {
        opt.canvasId = canvasId;
      }
      ctx.draw(true, () => {
        wx.canvasToTempFilePath(opt);
      });
    }
  };

  const init = useMemoizedFn((callback?: Init) => {
    const version = wx.getSystemInfoSync().SDKVersion
    const canUseNewCanvas = compareVersion(version, '2.9.0') >= 0;
    const isUseNewCanvas = canUseNewCanvas && !forceUseOldCanvas;
    setData({ isUseNewCanvas });

    if (forceUseOldCanvas && canUseNewCanvas) {
      console.warn('开发者强制使用旧canvas,建议关闭');
    }

    if (isUseNewCanvas) {
      // console.log('微信基础库版本大于2.9.0，开始使用<canvas type="2d"/>');
      // 2.9.0 可以使用 <canvas type="2d"></canvas>
      initByNewWay(callback);
    } else {
      const isValid = compareVersion(version, '1.9.91') >= 0
      if (!isValid) {
        console.error('微信基础库版本过低，需大于等于 1.9.91。'
          + '参见：https://github.com/ecomfe/echarts-for-weixin'
          + '#%E5%BE%AE%E4%BF%A1%E7%89%88%E6%9C%AC%E8%A6%81%E6%B1%82');
        return;
      } else {
        console.warn('建议将微信基础库调整大于等于2.9.0版本。升级后绘图将有更好性能');
        initByOldWay(callback);
      }
    }
  });

  const handleTouchStart = useMemoizedFn((e: any) => {
    if (that.chart && e.touches.length > 0) {
      const touch = e.touches[0];
      const handler = that.chart.getZr().handler;
      handler.dispatch('mousedown', {
        zrX: touch.x,
        zrY: touch.y,
        preventDefault: () => {},
        stopImmediatePropagation: () => {},
        stopPropagation: () => {}
      });
      handler.dispatch('mousemove', {
        zrX: touch.x,
        zrY: touch.y,
        preventDefault: () => {},
        stopImmediatePropagation: () => {},
        stopPropagation: () => {}
      });
      handler.processGesture(wrapTouch(e), 'start');
    }
  });

  const handleTouchMove = useMemoizedFn((e: any) => {
    if (that.chart && e.touches.length > 0) {
      const touch = e.touches[0];
      const handler = that.chart.getZr().handler;
      handler.dispatch('mousemove', {
        zrX: touch.x,
        zrY: touch.y,
        preventDefault: () => {},
        stopImmediatePropagation: () => {},
        stopPropagation: () => {}
      });
      handler.processGesture(wrapTouch(e), 'change');
    }
  });

  const handleTouchEnd = useMemoizedFn((e: any) => {
    if (that.chart) {
      const touch = e.changedTouches ? e.changedTouches[0] : {};
      const handler = that.chart.getZr().handler;
      handler.dispatch('mouseup', {
        zrX: touch.x,
        zrY: touch.y,
        preventDefault: () => {},
        stopImmediatePropagation: () => {},
        stopPropagation: () => {}
      });
      handler.dispatch('click', {
        zrX: touch.x,
        zrY: touch.y,
        preventDefault: () => {},
        stopImmediatePropagation: () => {},
        stopPropagation: () => {}
      });
      handler.processGesture(wrapTouch(e), 'end');
    }
  });

  useEffect(() => {
    echarts.registerPreprocessor(option => {
      if (option && option.series) {
        if (option.series.length > 0) {
          option.series.forEach(series => {
            series.progressive = 0;
          });
        }
        else if (typeof option.series === 'object') {
          option.series.progressive = 0;
        }
      }
    });

    if (!ec) {
      console.warn('组件需绑定 ec 变量，例：<ec-canvas id="mychart-dom-bar" '
        + 'canvas-id="mychart-bar" ec="{{ ec }}"></ec-canvas>');
      return;
    }

    if (!ec.lazyLoad) {
      init();
    }
  }, []);

  useImperativeHandle(ref, () => ({
    init,
    canvasToTempFilePath
  }));

  const { isUseNewCanvas } = data;

  return (
    isUseNewCanvas
      ? (
        // @ts-ignore
        <canvas type="2d" id={canvasId}
          className="ec-canvas"
          style={{ width: '100%', height: '100%' }}
          canvas-id={canvasId}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        ></canvas>
      )
      : (
        <canvas id={canvasId}
          className="ec-canvas"
          canvas-id={canvasId}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        ></canvas>
      )
  );
})));
