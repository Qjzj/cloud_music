/**
 * @Author QJ
 * @date 2020--09 17:03
 * @desc actions.js
 */
import * as actionTypes from './actionTypes'
import {fromJS} from "immutable";
import {getSingerInfoRequest} from "../../../api/request";

const changeArtist = data => ({
  type: actionTypes.CHANGE_ARTIST,
  data: fromJS(data)
});

const changeSongs = data => ({
  type: actionTypes.CHANGE_SONGS_OF_ARTIST,
  data: fromJS(data)
});

export const changeEnterLoading = data => ({
  type: actionTypes.CHAGNE_ENTER_LOADING,
  data
});

export const getSingerInfo = id => dispatch => {
  getSingerInfoRequest(id).then(data => {
    console.log('*****', data);
    dispatch(changeArtist(data.artist));
    dispatch(changeSongs(data.hotSongs));
    dispatch(changeEnterLoading(false));
  })
};
