import React, {forwardRef, useState, useEffect, useRef, useImperativeHandle} from 'react'
import PropTypes from 'prop-types'
import BScroll from 'better-scroll'
import {ScrollContainer} from './style'

const Scroll = forwardRef((props, ref) => {
  // better 实例对象
  const [bScroll, setBScroll] = useState();
  // current 指向初始化bs实例需要的DOM元素
  const scrollContainerRef = useRef();

  // 获取props属性
  const {
    direction,
    click,
    refresh,
    onScroll,
    pullDown,
    pullUp,
    pullUpLoading,
    pullDownLoading,
    bounceTop,
    bounceBottom
  } = props;

  useEffect(() => {
    const scroll = new BScroll(scrollContainerRef.current, {
      scrollX: direction === 'horizontal',
      scorllY: direction === 'vertical',
      probeType: 3,
      click: click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom
      }
    });
    setBScroll(scroll);
    return () => {
      setBScroll(null);
    }
  }, []);
  // 每次重新渲染时刷新实例，放置无法滚动
  useEffect(() => {
   if(refresh && bScroll) {
     bScroll.refresh();
   }
  })

  // 给实例绑定scroll事件
  useEffect(() => {
    if(!bScroll || !onScroll) return;
    bScroll.on('scroll', (scroll) => {
      onScroll(scroll);
    })
    return () => {
      bScroll.off('scroll');
    }
  }, [onScroll, bScroll])

  // 上拉加载到底判断，调用上拉刷新函数
  useEffect(() => {
    if(!bScroll || !pullUp) return;
    bScroll.on('scrollEnd', () => {
      if(bScroll.y < bScroll.maxScrollY + 100) {
        pullUp();
      }
    });
    return () => {
      bScroll.off('scrollEnd');
    }
  }, [pullUp, bScroll]);

  // 下拉判断， 调用下拉刷新
  useEffect(() => {
    if(!bScroll || !pullDown) return;
    bScroll.on('touchEnd', (pos) => {
      // 判断下拉动作
      if(pos.y > 50) {
        pullDown();
      }
    });
    return () => {
      bScroll.on('touchEnd');
    }
  }, [pullDown, bScroll]);

  // 向外界暴露方法
  useImperativeHandle(ref, () => ({
    // 暴露refresh方法
    refresh() {
      if(bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    // 给外界暴露getBscroll 获取bs实例
    getBscroll() {
      if(bScroll) return bScroll;
    }

  }))

  return (
    <ScrollContainer ref={scrollContainerRef}>
      {props.children}
    </ScrollContainer>
  )




});

Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  clik: PropTypes.bool,         // 是否支持点击
  refresh: PropTypes.bool,      // 是否刷新
  onScroll: PropTypes.func,     // 滑动触发的回调函数
  pullUp: PropTypes.func,       // 上拉加载逻辑
  pullDown: PropTypes.func,     // 下拉家在逻辑
  pullUpLoading: PropTypes.bool, // 是否显示上拉Loading
  pullDownLoading: PropTypes.bool,// 是否显示下拉Loading
  bounceTop: PropTypes.bool,     // 是否支持向上吸顶
  bounceBottom: PropTypes.bool,  // 是否支持向下吸顶  
}

Scroll.defaultProps = {
  direction: 'vertical',
  click: true,
  refresh: true,
  onScroll: null,
  pullUpLoading: true,
  pullDownLoading: true,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true,
}

export default React.memo(Scroll);