import {
  LOAD_GOODS,
  RECEIVE_GOODS
} from './types';

import {
  authError,
} from './index';
import goodService from '../services/goodService';

function loadGoods() {
  return {
    type: LOAD_GOODS
  }
}

function receiveGoods(goods) {
  return {
    type: RECEIVE_GOODS,
    goods
  }
}

function fetchGoods(adminId, token, good, pageNum, rows) {
  return async (dispatch) => {
    try {
      dispatch(loadGoods())
      const res = await goodService.all(adminId, token, good, pageNum, rows)
      return dispatch(receiveGoods(res.data.data))
    } catch (err) {
      if (err.response === undefined) {
        const errorMessage = '服务器错误，请稍后再试'
        return dispatch(authError(errorMessage))
      }
      if (err.response.status === 401) {
        const errorMessage = '您的登录已过期，请重新登录'
        return dispatch(authError(errorMessage))
      }
    }
  }
}


export {
  loadGoods,
  receiveGoods,
  fetchGoods
}
