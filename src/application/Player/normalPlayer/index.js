/**
 * @Author QJ
 * @date 2020--10 15:36
 * @desc index.js
 */
import React, {useRef, memo} from 'react'
import {getName} from "../../../util"
import {CSSTransition} from 'react-transition-group'
import animations from 'create-keyframe-animation'
import {
  NormalPlayerContainer,
  Top,
  Middle,
  Bottom,
  Operators,
  CDWrapper,
  ProgressWrapper
} from './style'
import {prefixStyle, formatPlayTime} from "../../../util";
import ProgressBar from '../../../baseUI/progress-bar'

const _getPosAndScale = () => {
  const targetWidth = 40;
  const paddingLeft = 40;
  const paddingBottom = 30;
  const paddingTop = 80;
  const width = window.innerWidth * 0.8;
  const scale = targetWidth / width;

  const x = -(window.innerWidth / 2 - paddingLeft);
  const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;

  return {
    x, y, scale
  }
};

const transform = prefixStyle('transform');

function NormalPlayer(props) {
  const {song, fullScreen, percent, playing, currentTime, duration, mode} = props;
  const {toggleFullScreen, clickPlaying, onProgressChange, handlePrev, handleNext, changeMode} = props;

  const normalPlayerRef = useRef();
  const cdWrapperRef = useRef();

  const enter = () => {
    normalPlayerRef.current.style.display = "block";
    const {x, y, scale} = _getPosAndScale();

    let animation = {
      0: {
        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
      },
      60: {
        transform: `translate3d(0,0,0) scale(1.1)`
      },
      100: {transform: `translate3d(0,0,0) scale(1)`}
    };


    animations.registerAnimation({
      name: "move",
      animation,
      presets: {
        duration: 400,
        easing: 'linear'
      }
    });

    animations.runAnimation(cdWrapperRef.current, "move");
  };

  const afterEnter = () => {
    const cdWrapperDom = cdWrapperRef.current;
    animations.unregisterAnimation("move");
    cdWrapperDom.style.animation = "";
  };

  const leave = () => {
    if (!cdWrapperRef.current) return;
    const cdWrapperDom = cdWrapperRef.current;
    cdWrapperDom.style.transition = "all .4s";
    const {x, y, scale} = _getPosAndScale();
    cdWrapperDom.style[transform] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
  };

  const afterLeave = () => {
    if (!cdWrapperRef.current) return;
    const cdWrapperDom = cdWrapperRef.current;
    cdWrapperDom.style.transition = "";
    cdWrapperDom.style[transform] = "";
    normalPlayerRef.current.style.display = "none";
  };

  const getModeIconName = (mode) => {
    switch(mode) {
      case 0:
        return 'icon-loop';
      case 1:
        return 'icon-singlecycle';
      case 2:
        return 'icon-random';
      default:
        return 'icon-loop';
    }
  };

  return (
    <CSSTransition
      in={fullScreen}
      classNames="normal"
      timeout={400}
      mountOnEnter
      onEnter={enter}
      onEntered={afterEnter}
      onExit={leave}
      onExited={afterLeave}
    >
      <NormalPlayerContainer ref={normalPlayerRef}>
        <div className="background">
          <img
            src={song.al.picUrl + "?imageView=1&type=webp&thumbnail=60x0"}
            width="100%"
            height="100%"
            alt="歌曲图片"
          />
        </div>
        <div className="background layer"/>
        <Top className="top">
          <div className="back" onClick={() => toggleFullScreen(false)}>
            <i className="iconfont icon-back"/>
          </div>
          <h1 className="title">{song.name}</h1>
          <h1 className="subtitle">{getName(song.ar)}</h1>
        </Top>
        <Middle ref={cdWrapperRef}>
          <CDWrapper>
            <div className="cd">
              <img
                className={`image ${playing ? '' : 'pause'}`}
                src={song.al.picUrl + "?imageView&thumbnail=360y360&quality=75&tostatic=0"}
                alt=""
              />
            </div>
          </CDWrapper>
        </Middle>
        <Bottom className="bottom">
          <ProgressWrapper>
            <span className="time time-l">{formatPlayTime(currentTime)}</span>
            <div className="progress-bar-wrapper">
              <ProgressBar
                percent={percent}
                percentChange={onProgressChange}
              />
            </div>
            <span className="time time-r">{formatPlayTime(duration)}</span>
          </ProgressWrapper>
          <Operators>
            <div className="icon i-left">
              <i className={`iconfont ${getModeIconName(mode)}`} onClick={changeMode}/>
            </div>
            <div className="icon i-left">
              <i className="iconfont icon-previous" onClick={handlePrev} />
            </div>
            <div className="icon i-center">
              {
                playing ?
                  <i className="iconfont icon-play" onClick={e => clickPlaying(e, false)}/>
                  :
                  <i className="iconfont icon-timeout" onClick={e => clickPlaying(e, true)}/>
              }
            </div>
            <div className="icon i-right">
              <i className="iconfont icon-nextsong" onClick={handleNext}/>
            </div>
            <div className="icon i-right">
              <i className="iconfont icon-musiclist"/>
            </div>

          </Operators>
        </Bottom>
      </NormalPlayerContainer>
    </CSSTransition>
  )
}

export default React.memo(NormalPlayer)
