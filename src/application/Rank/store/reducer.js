/**
 * @Author QJ
 * @date 2020--27 10:19
 * @desc reducer.js
 */
import {fromJS} from "immutable";
import * as actionTypes from './actionTypes'

const defaultState = fromJS({
  rankList: [],
  loading: true
});

export default (state = defaultState, action) => {
  const {type, data} = action;

  switch (type) {
    case actionTypes.CHANGE_RANK_LIST:
      return state.set('rankList', data);
    case actionTypes.CHANGE_LOADING:
      return state.set('loading', data);
    default :
      return state;
  }
}
