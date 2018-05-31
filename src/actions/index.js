import * as Types from './types';
import userService from '../services/userService';
import {
  setCurrentUser,
  authError,
  signin,
  signout
} from './authAction';
import {
  loadGoods,
  receiveGoods,
  fetchGoods,
} from './goodAction';
import {
  fetchCategories
} from './categoryFirstAction';
import {
  fetchAllCategorySecond
} from './categorySecondAction'
import {
  getAllOrders,
  statistics as statisticsOrder,
  updateOrderStatus
} from './orderAction';
import {
  fetchAdminList
} from './adminInfoAction';

function serviceStart() {
  return {
    type: Types.SERVICE_START
  }
}

function serviceEnd() {
  return {
    type: Types.SERVICE_END
  }
}

function loadUsers() {
  return {
    type: Types.LOAD_USERS
  }
}

function receiveUsers(users) {
  return {
    type: Types.RECEIVE_USERS,
    users
  }
}

function fetchUsers(adminId, token) {
  return async (dispatch) => {
    try {
      dispatch(loadUsers())
      const res = await userService.all(adminId, token)
      return dispatch(receiveUsers(res.data.data))
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
  serviceStart,
  serviceEnd,
  setCurrentUser,
  signin,
  signout,
  authError,
  fetchUsers,
  loadGoods,
  fetchGoods,
  receiveGoods,
  fetchCategories,
  fetchAllCategorySecond,
  getAllOrders,
  statisticsOrder,
  updateOrderStatus,
  fetchAdminList
}
export { getAllAdvs } from './advAction.js';
