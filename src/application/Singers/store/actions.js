/**
 * @Author QJ
 * @date 2020--22 17:52
 * @desc actions.js
 */
import * as actionTypes from './constants'
// import {fromJS} from "immutable";
import {
  getSingerListRequest,
  getHotSingerListRequest,
} from '../../../api/request'

export const changeSingerList = data => ({
  type: actionTypes.CHANGE_SINGER_LIST,
  data
});

export const changePageCount = data => ({
  type: actionTypes.CHANGE_PAGE_COUNT,
  data
});

export const changeEnterLoading = data => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data
});

export const  changePullUpLoading = data => ({
  type: actionTypes.CHANGE_PULLUP_LOADING,
  data
});

export const changePullDownLoading = data => ({
  type: actionTypes.CHANGE_PULLDOWN_LOADING,
  data
});

export const getHotSingerList = () => dispatch => {
  getHotSingerListRequest(0).then(res => {
    const data = res.artists;

    dispatch(changeSingerList(data));
    dispatch(changeEnterLoading(false));
    dispatch(changePullDownLoading(false));
  }).catch (err => {
    console.log('加载热门歌手失败', err);
  })
};

export const refreshMoreHotSingerList = () => (dispatch, getState) => {
  const pageCount = getState().getIn(['singers', 'pageCount']);
  const singerList = getState().getIn(['singers', 'singerList']);

  getHotSingerListRequest(pageCount).then(res => {
    const data = [...singerList, ...res.artists];
    dispatch(changeSingerList(data));
    dispatch(changePullUpLoading(false));
  }).catch(e => {
    console.log('加载更多热门歌手失败', e);
  })

};

// 第一次加载对应类别的歌手
export const getSingerList = (category, alpha) => (dispatch, getState) => {
  getSingerListRequest(category, alpha, 0).then(res => {
    const data = res.artists;

    dispatch(changeSingerList(data));
    dispatch(changeEnterLoading(false));
    dispatch(changePullDownLoading(false));
  }).catch (e => {
    console.log('歌手数据获取失败', e);
  })
};

// 加载更多歌手
export const refreshMoreSingerList = (category, alpha) => (dispatch, getState) => {
  const pageCount = getState().getIn(['singers', 'pageCount']);
  const singerList = getState().getIn(["singers", 'singerList']).toJS();

  getSingerListRequest(category, alpha, pageCount).then(res => {
    const data = [...singerList, ... res.artists];

    dispatch(changeSingerList(data));
    dispatch(changePullUpLoading(false));

  }).catch (e => {
    console.log('歌手数据获取失败', e);
  })
}

