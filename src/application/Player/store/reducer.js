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
  sequencePlayList: [
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
  ], // 顺序列表
  playList: [
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
  ],
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
