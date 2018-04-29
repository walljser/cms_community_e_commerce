import {
  LOAD_CATEGORIES,
  FINISH_CATEGORIES,
  CREATE_CATEGORY
} from './types';
import {
  service,
  serviceSuccess,
  serviceFailure,
  authError
} from './index';
import categoryService from '../services/categoryService';

function loadCategories() {
  return {
    type: LOAD_CATEGORIES
  }
}

function finishCategories(categories) {
  return {
    type: FINISH_CATEGORIES,
    payload: categories
  }
}

function createCategory() {
  return {
    type: CREATE_CATEGORY
  }
}

function fetchCategories() {
  return async (dispatch) => {
    try {
      dispatch(loadCategories())
      const res = await categoryService.all()
      return dispatch(finishCategories(res.data.data))
    } catch (err) {
      // if (err.response === undefined) {
      const errorMessage = '服务器错误，请稍后再试'
      return dispatch(authError(errorMessage))
      // }
    }
  }
}

export {
  fetchCategories
}
