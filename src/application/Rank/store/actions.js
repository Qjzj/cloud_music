/**
 * @Author QJ
 * @date 2020--27 10:19
 * @desc actions.js
 */
import {fromJS} from "immutable";
import {
  getRankListRequest
} from '../../../api/request'
import * as actionTypes from './actionTypes'

const changeRankList = data => ({
  type: actionTypes.CHANGE_RANK_LIST,
  data: fromJS(data)
});

const changeEnterLoading = data => ({
  type: actionTypes.CHANGE_LOADING,
  data
});

export const getRankList = () => dispatch => {
  getRankListRequest().then(res => {
    const list = (res && res.list) || [];

    dispatch(changeRankList(list));
    dispatch(changeEnterLoading(false));
  })
};

