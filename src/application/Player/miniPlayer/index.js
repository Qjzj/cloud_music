/**
 * @Author QJ
 * @date 2020--10 14:38
 * @desc index.js
 */
import React, {useRef} from 'react'
import {getName} from "../../../util";
import {MiniPlayerContainer} from './style'
import {CSSTransition} from "react-transition-group";

import ProgressCircle from '../../../baseUI/progress-circle/progress-circle'


function MiniPlayer(props) {
  const {song, fullScreen, playing, percent} = props;
  const {clickPlaying, toggleFullScreen} = props;


  const miniPlayerRef = useRef();
  return (
    <CSSTransition
      in={!fullScreen}
      timeout={400}
      classNames='mini'
      onEnter={() => miniPlayerRef.current.style.display="flex"}
      onExit = {() =>miniPlayerRef.current.style.display = "none"}
    >
      <MiniPlayerContainer ref={miniPlayerRef} onClick={() => toggleFullScreen(true)}>
        <div className="icon">
          <div className="imgWrapper">
            <img className={`play ${playing ? '' : 'pause'}`} src={song.al.picUrl + "?imageView=1&type=webp&thumbnail=60x0"} alt=""/>
          </div>
        </div>
        <div className="text">
          <h2 className="name">{song.name}</h2>
          <p className="desc">{getName(song.ar)}</p>
        </div>
        <div className="control">
          <ProgressCircle radius={32} percent={percent}>
            {
              playing ?
                <i className="iconfont icon-play" onClick={e => clickPlaying(e, false)} />
                :
                <i className="iconfont icon-timeout" onClick={e => clickPlaying(e, true)} />
            }
          </ProgressCircle>
        </div>
        <div className="control">
          <i className="iconfont icon-musiclist" />
        </div>
      </MiniPlayerContainer>
    </CSSTransition>
  )
}

export default React.memo(MiniPlayer)
