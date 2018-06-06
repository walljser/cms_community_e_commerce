import {
  LOAD_ORDERS,
  RECEIVE_ORDERS,
  STATISTICS_ORDER,
  ORDER_SERVICE_START,
  ORDER_SERVICE_END
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

function statisticsOrder(data) {
  return {
    type: STATISTICS_ORDER,
    payload: data
  }
}

function orderServiceStart() {
  return {
    type: ORDER_SERVICE_START
  }
}

function orderServiceEnd() {
  return {
    type: ORDER_SERVICE_END
  }
}

function getAllOrders(adminId, token, params) {
  return async dispatch => {
    try {
      dispatch(loadOrders())
      const res = await orderService.all(adminId, token, params)
      const data = res.data.data
      console.log(data)

      dispatch(statistics(adminId, token))
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

function statistics(adminId, token) {
  return async dispatch => {
    try {
      const res = await orderService.statistics(adminId, token)
      const data = res.data.data
      return dispatch(statisticsOrder(data))
    } catch (err) {
      if (err.response === undefined) {
        const errorMessage = '服务器错误，请稍后再试'
        return dispatch(authError(errorMessage))
      }
    }
  }
}

function updateOrderStatus(adminId, token, orderId, status) {
  return async dispatch => {
    try {
      dispatch(orderServiceStart())
      const res = await orderService.update(adminId, token, orderId, status)
      return dispatch(orderServiceEnd())
    } catch (err) {
      if (err.response === undefined) {
        const errorMessage = '服务器错误，请稍后再试'
        return dispatch(authError(errorMessage))
      }
    }
  }
}

export {
  getAllOrders,
  statistics,
  updateOrderStatus
}
