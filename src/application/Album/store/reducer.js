/**
 * @Author QJ
 * @date 2020--29 11:11
 * @desc reducer.js
 */
import {fromJS} from "immutable";
import * as actionTypes from './actionTypes'

const defaultState = fromJS({
  currentAlbum: {},
  enterLoading: true
});

export default function (state=defaultState, action) {
  const {type, data} = action;

  switch (type) {
    case actionTypes.CHANGE_ENTER_LOADING:
      return state.set('enterLoading', data);
    case actionTypes.CHANGE_CURRENT_ALBUM:
      return state.set('currentAlbum', data);
    default:
      return state;
  }
}
