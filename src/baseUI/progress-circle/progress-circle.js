/**
 * @Author QJ
 * @date 2020--12 14:49
 * @desc progress-circle.js
 */
import React from 'react'
import styled from 'styled-components'
import style from '../../assets/global-style'

const CircleWrapper = styled.div`
  position: relative;
  
  circle {
    transform-origin: center;
    stroke-width: 6px;
    
    &.progress-background {
      transform: scale(.9);
      stroke: ${style['theme-color-shadow']};
    }
    
    &.progress-bar {
      transform: scale(.9) rotate(-90deg);
      stroke: ${style['theme-color']}
    }
    
  }
`;

function ProgressCircle(props) {
  const {radius, percent} = props;
  // 整个背景周长
  const dashArray = Math.PI * 100;
  // 没有高亮的部分， 剩下高亮的就是进度
  const dashOffset = (1 - percent) * dashArray;

  return (
    <CircleWrapper>
      <svg width={radius} height={radius} viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle className="progress-background" r="50" cx="50" cy="50" fill="transparent" />
        <circle
          className="progress-bar"
          r="50"
          cx="50"
          cy="50"
          fill={"none"}
          stroke="green"
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
        />
      </svg>
      {props.children}
    </CircleWrapper>
  )
}

export default React.memo(ProgressCircle);
