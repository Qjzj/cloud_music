/**
 * @Author QJ
 * @date 2020--10 10:59
 * @desc index.js
 */
import React, {useRef, useState, useEffect} from 'react'
import {connect} from 'react-redux'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {
  changePlayingState,
  changeShowPlayList,
  changeCurrentIndex,
  changeCurrentSong,
  changePlayList,
  changeFullScreen,
  changePlayMode,
  changeSequencePlayList
} from './store/actions'

import MiniPlayer from './miniPlayer'
import NormalPlayer from './normalPlayer'
import Toast from '../../baseUI/Toast'
import {playMode} from "../../config/config";
import {getSongUrl, isEmpty, findIndex, shuffle} from "../../util";

/**
 * @return {null}
 */
function Player(props) {
  const {fullScreen, playing, currentIndex, currentSong: immutableCurrentSong, mode, sequencePlayList: immutableSequencePlayList, playList: immutablePlayList} = props;
  const {toggleFullScreenDispatch, togglePlayingDispatch, changeCurrentIndexDispatch, changeCurrentSongDispatch, changeModeDispatch, changePlayListDispatch} = props;

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [preSong, setPreSong] = useState({});
  const [modeText, setModeText] = useState('');

  const percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;
  const currentSong = immutableCurrentSong.toJS();
  const playList = immutablePlayList.toJS();
  const sequencePlayList = immutableSequencePlayList.toJS();

  const audioRef = useRef();
  const toastRef = useRef();

  useEffect(() => {
    changeCurrentIndexDispatch(0);
  }, []);

  useDeepCompareEffect(() => {
    if (
      !playList.length ||
      currentIndex === -1 ||
      !playList[currentIndex] ||
      playList[currentIndex].id === preSong.id
    ) return;

    let current = playList[currentIndex];
    changeCurrentSongDispatch(current);
    audioRef.current.src = getSongUrl(current.id);

    setTimeout(() => {
      audioRef.current.play();
    });
    // console.log(currentSong);

    // 修改播放状态
    togglePlayingDispatch(true);
    // 从头开始播放
    setCurrentTime(0);
    setDuration((current.dt / 1000) | 0);

  }, [playList, currentIndex]);

  useEffect(() => {
    // console.log('**', audioRef.current, playing);
    playing ? audioRef.current.play() : audioRef.current.pause();
  }, [playing]);

  const clickPlaying = (e, state) => {
    e.stopPropagation();
    togglePlayingDispatch(state);
  };

  // 播放歌曲过程中 更新播放时间
  const updateTime = e => {
    setCurrentTime(e.target.currentTime);
  };

  // 进度条改变
  const onProgressChange = curPercent => {
    const newTime = curPercent * duration;
    setCurrentTime(newTime)
    audioRef.current.currentTime = newTime;
    if (!playing) {
      togglePlayingDispatch(true);
    }
  };

  // 循环
  const handleLoop = () => {
    audioRef.current.currentTime = 0;
    changePlayingState(true);
    // console.log('*', audioRef.current);
    audioRef.current.play();
  };

  // 上一曲
  const handlePrev = () => {
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex - 1;
    if (index < 0) index = playList.length - 1;
    if (!playing) togglePlayingDispatch(true);
    changeCurrentIndexDispatch(index);
  };

  // 下一曲
  const handleNext = () => {
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex + 1;
    if (index === playList.length - 1) index = 0;
    if (!playing) togglePlayingDispatch(true);
    changeCurrentIndexDispatch(index);
  };

  // 修改播放模式
  const changeMode = () => {
    let newMode = (mode + 1) % 3;
    if (newMode === playMode.sequence) {
      // 顺序播放
      changePlayListDispatch(sequencePlayList);
      let index = findIndex(currentSong, sequencePlayList);
      changeCurrentIndexDispatch(index);
      setModeText('顺序播放');
    } else if (newMode === playMode.loop) {
      // 单曲循环
      changePlayListDispatch([currentSong]);
      setModeText("单曲循环");
    } else if (newMode === playMode.random) {
      // 随机播放
      let newList = shuffle(sequencePlayList);
      let index = findIndex(currentSong, newList);
      changePlayListDispatch(newList);
      changeCurrentIndexDispatch(index);
      setModeText("随机播放");
    }
    changeModeDispatch(newMode);
    toastRef.current.show();
  };

  const handleEnd = () => {
    handleNext();
  };

  return (
    <div>
      {
        !isEmpty(currentSong) && <MiniPlayer
          song={currentSong}
          fullScreen={fullScreen}
          playing={playing}
          percent={percent}
          toggleFullScreen={toggleFullScreenDispatch}
          clickPlaying={clickPlaying}
        />
      }

      {
        !isEmpty(currentSong) && <NormalPlayer
          song={currentSong}
          fullScreen={fullScreen}
          playing={playing}
          percent={percent}  // 进度
          duration={duration}   // 总时长
          currentTime={currentTime}  // 播放时间
          toggleFullScreen={toggleFullScreenDispatch}
          clickPlaying={clickPlaying}
          onProgressChange={onProgressChange}
          handlePrev={handlePrev}
          handleNext={handleNext}
          mode={mode}
          changeMode={changeMode}
        />
      }

      <audio ref={audioRef} onTimeUpdate={updateTime} onEnded={handleEnd}/>
      <Toast text={modeText} ref={toastRef} />
    </div>
  )
}

const mapStateToProps = state => ({
  fullScreen: state.getIn(['player', 'fullScreen']),
  playing: state.getIn(['player', 'playing']),
  currentSong: state.getIn(['player', 'currentSong']),
  showPlayList: state.getIn(['player', 'showPlayList']),
  mode: state.getIn(['player', 'mode']),
  currentIndex: state.getIn(['player', 'currentIndex']),
  playList: state.getIn(['player', 'playList']),
  sequencePlayList: state.getIn(['player', 'sequencePlayList']),
});

const mapDispatchToProps = dispatch => ({
  togglePlayingDispatch(data) {
    dispatch(changePlayingState(data));
  },
  toggleFullScreenDispatch(data) {
    dispatch(changeFullScreen(data))
  },
  toggleShowPlayListDispatch(data) {
    dispatch(changeShowPlayList(data))
  },
  changeCurrentIndexDispatch(data) {
    dispatch(changeCurrentIndex(data))
  },
  changeCurrentSongDispatch(data) {
    dispatch(changeCurrentSong(data))
  },
  changeModeDispatch(data) {
    dispatch(changePlayMode(data))
  },
  changePlayListDispatch(data) {
    dispatch(changePlayList(data))
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Player))
