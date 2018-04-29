import {
  LOAD_ORDERS,
  RECEIVE_ORDERS
} from './types';
import {
  authError
} from './index';
import orderService from '../services/orderService';

function loadOrders() {
  return {
    type: LOAD_ORDERS
  }
}

function receiveOrders(data) {
  return {
    type: RECEIVE_ORDERS,
    payload: data
  }
}

function getAllOrders(adminId, token) {
  return async (dispatch) => {
    try {
      dispatch(loadOrders())
      const res = await orderService.all(adminId, token)
      const data = res.data.data
      return dispatch(receiveOrders(data))
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
  getAllOrders
}
