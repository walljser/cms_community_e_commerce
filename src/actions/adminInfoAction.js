import { LOAD_ADMIN_INFO, LOAD_ADMIN_INFO_SUCCESS, LOAD_ADMIN_INFO_FAILURE } from "./types";
import { authError} from './index';
import adminInfoService from '@/services/adminInfoService';

function loadAdminInfo() {
  return {
    type: LOAD_ADMIN_INFO
  }
}

function loadAdminInfoSuccess(data) {
  return {
    type: LOAD_ADMIN_INFO_SUCCESS,
    payload: data
  }
}

function loadAdminInfoFailure(msg) {
  return {
    type: LOAD_ADMIN_INFO_FAILURE,
    payload: msg
  }
}

function fetchAdminList(adminId, token) {
  return async (dispatch) => {
    try {
      dispatch(loadAdminInfo())
      const res = await adminInfoService.all(adminId, token)
      const data = res.data.data
      return dispatch(loadAdminInfoSuccess(data))
    } catch (err) {
      console.log(err.response)
      // if (err.response === undefined) {
      //   const errorMessage = '服务器错误，请稍后再试'
      //   return dispatch(authError(errorMessage))
      // }

      // if (err.response.status === 404 && err.response.data.code === -1001) {
      //   const errorMessage = err.response.data.message
      //   return dispatch(authError(errorMessage))
      // }
    }
  }
}

export {
  fetchAdminList
}
