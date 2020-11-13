/**
 * @Author QJ
 * @date 2020--10 10:59
 * @desc reducer.js
 */
import * as actionTypes from './actionTypes'
import {fromJS} from "immutable";
import {playMode} from './../../../config/config'

const defaultState = fromJS({
  fullScreen: false,  // 播放器全屏模式
  playing: false,     // 当前歌曲是否播放
  sequencePlayList: [], // 顺序列表
  playList: [],
  mode: playMode.sequence,   //  播放模式
  currentIndex: -1,  // 当前歌曲在播放列表中的位置
  showPlayList:  false,   // 是否显示播放列表
  currentSong: {}
});

export default (state = defaultState, action) => {
  const {type, data} = action;

  switch (type) {
    case actionTypes.SET_CURRENT_SONG:
      return state.set('currentSong', data);
    case actionTypes.SET_FULL_SCREEN:
      return state.set('fullScreen', data);
    case actionTypes.SET_PLAYING_STATE:
      return state.set('playing', data);
    case actionTypes.SET_SEQUENCE_PLAYLIST:
      return state.set('sequencePlayList', data);
    case actionTypes.SET_PLAYLIST:
      return state.set('playList', data);
    case actionTypes.SET_PLAY_MODE:
      return state.set('mode', data);
    case actionTypes.SET_CURRENT_INDEX:
      return state.set('currentIndex', data);
    case actionTypes.SET_SHOW_PLAY_LIST:
      return state.set('showPlayList', data);
    default:
      return state;
  }
}
