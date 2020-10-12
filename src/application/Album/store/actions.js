/**
 * @Author QJ
 * @date 2020--29 11:24
 * @desc actions.js
 */
import * as actionTypes from './actionTypes'
import {getAlbumDetailRequest} from '../../../api/request'
import {fromJS} from "immutable";

export const changeEnterLoading = data => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data
});

export const changeCurrentAlbum = data => ({
  type: actionTypes.CHANGE_CURRENT_ALBUM,
  data: fromJS(data)
});


export const getAlbumDetail = id => dispatch => {
  getAlbumDetailRequest(id).then(res => {
    let data = res['playlist'];
    dispatch(changeCurrentAlbum(data));
    dispatch(changeEnterLoading(false));
  }).catch (err => {
    console.log('获取album数据失败', err);
  })
};
