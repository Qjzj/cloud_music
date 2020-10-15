/**
 * @Author QJ
 * @date 2020--12 15:38
 * @desc index.js
 */
import React, {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import style from '../../assets/global-style'
import {prefixStyle} from "../../util";

const ProgressBarWrapper = styled.div`
  height: 30px;
  
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, .3);
    
    .progress {
      position: absolute;
      left: 0;
      height: 100%;
      background: ${style['theme-color']};
    }
    
    .progress-btn-wrapper {
      position: absolute;
      left: -15px;
      top: -13px;
      width: 30px;
      height: 30px;
      
      .progress-btn {
        position: absolute;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid ${style['border-color']};
        border-radius: 50%;
        background: ${style['theme-color']};
      }
    }
  }
`;

function ProgressBar(props) {

  const {percent, percentChange} = props;

  const progressBarRef = useRef();
  const progressRef = useRef();
  const progressBtnRef = useRef();

  const [touch, setTouch] = useState({});

  const progressBtnWidth = 8;
  const transform = prefixStyle('transform');

  useEffect(() => {
    if(percent >= 0 && percent <= 1 && !touch.initiated) {
      const barWidth = progressBarRef.current.clientWidth - progressBtnWidth;
      const offsetWidth = percent * barWidth;
      progressRef.current.style.width = `${offsetWidth}px`;
      progressBtnRef.current.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`;
    }
  }, [percent]);

  // 处理进度条的偏移
  const _offset = (offsetWidth) => {
    progressRef.current.style.width=`${offsetWidth}px`;
    progressBtnRef.current.style.transform=`translate3d(${offsetWidth}px, 0, 0)`;
  };

  const progressTouchStart = (e) => {
    console.log('touchStart')
    const startTouch = {};
    startTouch.initiated = true;
    startTouch.startX = e.touches[0].pageX;
    startTouch.left = progressRef.current.clientWidth;
    setTouch(startTouch);
  };

  const progressTouchMove = (e) => {
    console.log('touchMove');
    if(!touch.initiated) return ;
    const deltaX = e.touches[0].pageX - touch.startX;
    const barWidth = progressBarRef.current.clientWidth - progressBtnWidth;
    console.log('totalWidth', progressBarRef.current.clientWidth);
    console.log('barWidth', barWidth);
    const offsetWidth = Math.min(Math.max(0, touch.left + deltaX), barWidth);
    _offset(offsetWidth);
  };

  const progressTouchEnd = e => {
    console.log('touchEnd');
    const endTouch = JSON.parse(JSON.stringify(touch));
    endTouch.initiated = false;
    setTouch(endTouch);
    _changePercent();
  };

  const processClick = e => {
    const react = progressBarRef.current.getBoundingClientRect();
    const offsetWidth = e.pageX - react.left;
    _offset(offsetWidth);
    _changePercent()
  };

  const _changePercent = () => {
    const barWidth = progressBarRef.current.clientWidth - progressBtnWidth;
    const curPercent = Math.min(progressRef.current.clientWidth / barWidth, 1) ;
    percentChange(curPercent);
  };


  return (
    <ProgressBarWrapper>
      <div className="bar-inner" ref={progressBarRef} onClick={processClick}>
        <div className="progress" ref={progressRef} />
        <div
          className="progress-btn-wrapper"
          ref={progressBtnRef}
          onTouchStart={progressTouchStart}
          onTouchMove={progressTouchMove}
          onTouchEnd={progressTouchEnd}
        >
          <div className="progress-btn" />
        </div>
      </div>
    </ProgressBarWrapper>
  )
}

export default React.memo(ProgressBar);
