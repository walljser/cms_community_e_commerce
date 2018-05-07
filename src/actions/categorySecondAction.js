import { LOAD_CATEGORIES_SECOND, FINISH_CATEGORIES_SECOND } from "./types";
import { authError } from './index';
import categorySecondService from '../services/categorySecondService';

function loadCategorySecond() {
  return {
    type: LOAD_CATEGORIES_SECOND
  }
}

function finishCategorySecond(categories) {
  return {
    type: FINISH_CATEGORIES_SECOND,
    payload: categories
  }
}

function fetchAllCategorySecond() {
  return async dispatch => {
    try {
      dispatch(loadCategorySecond())
      const res = await categorySecondService.all()
      const data = res.data.data
      return dispatch(finishCategorySecond(data))
    } catch (err) {
      const errorMessage = '服务器错误，请稍后再试'
      return dispatch(authError(errorMessage))
    }
  }
}

export {
  fetchAllCategorySecond
}
