/**
 * @Author QJ
 * @date 2020--25 17:14
 * @desc data.js
 */
import React, {createContext, useReducer} from "react"
import {fromJS} from 'immutable'

export const CategoryDataContext = createContext({});

export const CHANGE_CATEGORY = 'singers/CHANGE_CATEGORY';
export const CHANGE_ALPHA = 'singers/CHANGE_ALPHA';

const reducer = (state, action) => {
  const {type, data} = action;
  switch (type) {
    case CHANGE_CATEGORY:
      return state.set('category', data);
    case CHANGE_ALPHA:
      return state.set('alpha', data);
    default :
      return state;
  }
};

export const Data = props => {
  const [data, dispatch] = useReducer(reducer, fromJS({
    category: '',
    alpha: ''
  }));

  return (
    <CategoryDataContext.Provider value={{data, dispatch}}>
      {props.children}
    </CategoryDataContext.Provider>
  )

}
