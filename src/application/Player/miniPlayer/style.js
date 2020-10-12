/**
 * @Author QJ
 * @date 2020--10 14:38
 * @desc style.js
 */
import styled, {keyframes} from "styled-components";
import style from '../../../assets/global-style'

const rotate = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg)
  }
`;

export const MiniPlayerContainer = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  height: 60px;
  background: ${style["background-color"]};
  border-top: 1px solid #ccc;
  
  &.mini-enter {
    transform: translate3d(0, 100%, 0);
  }
  
  &.mini-enter-active {
    transform: translate3d(0, 0, 0);
  }
  
  &.mini-exit-active {
    transform: translate3d(0, 100%, 0);
    transition: all .4s;
  }
  
  .icon {
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    padding: 0 10px 0 20px;
    
    .imgWrapper {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        
        &.play {
          animation: ${rotate} 10s infinite;
          
          &.pause {
            animation-play-state: paused;
          }
        }
      }
    }
  }
    
  .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    line-height: 20px;
    overflow: hidden;
    
    .name {
      margin-bottom: 2px;
      font-size: ${style['font-size-m']};
      color: ${style['font-color-desc']};
      ${style.noWrap()}
    }
    
    .desc {
      font-size: ${style['font-size-s']};
      color: ${style['font-color-desc-v2']};
      ${style.noWrap()}
    }
    
  }
  
  .control {
    flex: 0 0 30px;
    padding: 0 10px;
    
    .iconfont, .icon-playlist {
      font-size: 30px;
      color: ${style['theme-color']};
    }
    
    .icon-play, .icon-timeout {
      position: absolute;
      top: 1px;
      right: 0;
      bottom: 0;
      left: 1px;
      margin: auto;
    }
    
    
    .icon-mini {
      font-size: 16pxp;
      position: absolute;
      left: 8px;
      top: 8px;
      
      &.icon-play {
        left: 9px;
      }
    }
  }
`
