/**
 * @Author QJ
 * @date 2020--09 17:03
 * @desc reducer.js
 */
import * as actionTypes from './actionTypes'
import {fromJS} from "immutable";

const defaultState= fromJS({
  artist: {},
  songsOfArtist: [],
  loading: true
});

export default (state = defaultState, action) => {
  const {type, data} = action;
  switch (type) {
    case actionTypes.CHAGNE_ENTER_LOADING:
      console.log('loading', data);
      return state.set('loading', data);
    case actionTypes.CHANGE_ARTIST:
      console.log('artist', data);
      return state.set('artist', data);
    case actionTypes.CHANGE_SONGS_OF_ARTIST:
      console.log('songs', data);
      return state.set('songsOfArtist', data);
    default:
      return state;
  }
}
