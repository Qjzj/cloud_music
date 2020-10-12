/**
 * @Author QJ
 * @date 2020--10 10:59
 * @desc index.js
 */
import React, {useRef, useState, useEffect} from 'react'
import {connect} from 'react-redux'

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
import {getSongUrl, isEmpty} from "../../util";

/*const currentSong = {
  al: { picUrl: "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg" },
  name: "木偶人",
  ar: [{name: "薛之谦"}]
};*/

const playList = [
  {
    ftype: 0,
    djId: 0,
    a: null,
    cd: '01',
    crbt: null,
    no: 1,
    st: 0,
    rt: '',
    cf: '',
    alia: [
      '手游《梦幻花园》苏州园林版推广曲'
    ],
    rtUrls: [],
    fee: 0,
    s_id: 0,
    copyright: 0,
    h: {
      br: 320000,
      fid: 0,
      size: 9400365,
      vd: -45814
    },
    mv: 0,
    al: {
      id: 84991301,
      name: '拾梦纪',
      picUrl: 'http://p1.music.126.net/M19SOoRMkcHmJvmGflXjXQ==/109951164627180052.jpg',
      tns: [],
      pic_str: '109951164627180052',
      pic: 109951164627180050
    },
    name: '拾梦纪',
    l: {
      br: 128000,
      fid: 0,
      size: 3760173,
      vd: -41672
    },
    rtype: 0,
    m: {
      br: 192000,
      fid: 0,
      size: 5640237,
      vd: -43277
    },
    cp: 1416668,
    mark: 0,
    rtUrl: null,
    mst: 9,
    dt: 234947,
    ar: [
      {
        id: 12084589,
        name: '妖扬',
        tns: [],
        alias: []
      },
      {
        id: 12578371,
        name: '金天',
        tns: [],
        alias: []
      }
    ],
    pop: 5,
    pst: 0,
    t: 0,
    v: 3,
    id: 1416767593,
    publishTime: 0,
    rurl: null
  }
];

/**
 * @return {null}
 */
function Player(props) {
  const {fullScreen, playing, currentIndex, currentSong: immutableCurrentSong} = props;
  const {toggleFullScreenDispatch, togglePlayingDispatch, changeCurrentIndexDispatch, changeCurrentSongDispatch} = props;

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;
  let currentSong = immutableCurrentSong.toJS();

  const audioRef = useRef();

  useEffect(() => {
    if (!isEmpty(currentSong)) return;
    // currentIndex 默认为 -1  临时修改为 0
    changeCurrentIndexDispatch(0);
    let current = playList[0];
    changeCurrentSongDispatch(current);
    console.log(audioRef);
    audioRef.current.src = getSongUrl(current.id);

    setTimeout(() => {
      audioRef.current.play();
    });

    // 修改播放状态
    togglePlayingDispatch(true);
    // 从头开始播放
    setCurrentTime(0);
    setDuration((current.dt / 1000) | 0);

  }, []);

  const clickPlaying = (e, state) => {
    e.stopPropagation();
    togglePlayingDispatch(state);
  };

  console.log('&&&&&&&', isEmpty(currentSong));


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
          percent={percent}
          toggleFullScreen={toggleFullScreenDispatch}
          clickPlaying={clickPlaying}
        />
      }

      <audio ref={audioRef}/>
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
