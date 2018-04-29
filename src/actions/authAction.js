import {
  FETCH_TOKEN,
  SET_CURRENT_USER,
  AUTH_ERROR
} from './types';
import {
  ADMIN_ID,
  TOKEN
} from '../constants';
import * as utils from '../utils';
import authService from '../services/authService';

function fetchToken() {
  return {
    type: FETCH_TOKEN
  }
}

function setCurrentUser(admin) {
  return {
    type: SET_CURRENT_USER,
    admin
  }
}

function authError(error) {
  utils.removeStorage(ADMIN_ID)
  utils.removeStorage(TOKEN)
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

function signin(username, password) {
  return async (dispatch) => {
    try {
      dispatch(fetchToken())

      const res = await authService.post(username, password)

      if (res.status === 201 && res.data.code === 100) {
        const token = res.data.data.token
        const adminId = res.data.data.userId

        utils.setStorage(TOKEN, token)
        utils.setStorage(ADMIN_ID, adminId)

        return dispatch(setCurrentUser({
          adminId,
          token
        }))
      }
    } catch (err) {
      if (err.response === undefined) {
        const errorMessage = '服务器错误，请稍后再试'
        return dispatch(authError(errorMessage))
      }

      if (err.response.status === 404 && err.response.data.code === -1001) {
        const errorMessage = err.response.data.message
        return dispatch(authError(errorMessage))
      }
    }
  }
}


function signout() {
  return dispatch => {
    utils.removeStorage(TOKEN)
    dispatch(setCurrentUser({}))
  }
}

export {
  setCurrentUser,
  authError,
  signin,
  signout
}
