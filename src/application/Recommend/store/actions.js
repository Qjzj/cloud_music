/**
 * @Author QJ
 * @date 2020--22 15:26
 * @desc actioons.js
 */
import * as actionTypes from './constans'
import {fromJS} from "immutable";
import {getBannerRequest, getRecommendListRequest} from "../../../api/request";

export const changeBannerList = (data) => ({
  type: actionTypes.CHANGE_BANNER,
  data: fromJS(data)
});

export const changeRecommendList = (data) => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  data: fromJS(data)
});

export const changeEnterLoading = data => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data
})

export const getBannerList = () => dispatch =>{
  getBannerRequest().then(data => {
    dispatch(changeBannerList(data['banners']));
    dispatch(changeEnterLoading(false));
  }).catch(e => {
    console.log('轮播图获取错误', e);
  })
};

export const getRecommendList =() => dispatch => {
  getRecommendListRequest().then(data => {
    dispatch(changeRecommendList(data.result))
  }).catch (e => {
    console.log('推荐歌单数据传输错误');
  })
}
