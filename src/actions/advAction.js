import { LOAD_ADVS, LOAD_ADVS_SUCCESS, LOAD_ADVS_FAILURE } from "./types";
import {
  authError
} from './index';
import advService from '../services/advService';

function loadAdvs() {
  return {
    type: LOAD_ADVS
  }
}

function loadAdvsSuccess(data) {
  return {
    type: LOAD_ADVS_SUCCESS,
    payload: data
  }
}

function loadAdvsFailure() {
  return {
    type: LOAD_ADVS_FAILURE
  }
}

function getAllAdvs() {
  return async function(dispatch) {
    try {
      const res = await advService.all();
      const data = res.data.data
      return dispatch(loadAdvsSuccess(data))
    } catch (err) {
      if (err.response === undefined) {
        const errorMessage = '服务器错误，请稍后再试'
        dispatch(loadAdvsFailure())
        return dispatch(authError(errorMessage))
      }
      if (err.response.status === 401) {
        const errorMessage = '您的登录已过期，请重新登录'
        dispatch(loadAdvsFailure())
        return dispatch(authError(errorMessage))
      }
    }
  }
}

export {
  getAllAdvs
}
