import {
  LOAD_CATEGORIES_FIRST,
  FINISH_CATEGORIES_FIRST,
  CREATE_CATEGORY_FIRST
} from './types';
import {
  service,
  serviceSuccess,
  serviceFailure,
  authError
} from './index';
import categoryFirstService from '../services/categoryFirstService';

function loadCategories() {
  return {
    type: LOAD_CATEGORIES_FIRST
  }
}

function finishCategories(categories) {
  return {
    type: FINISH_CATEGORIES_FIRST,
    payload: categories
  }
}

function createCategory() {
  return {
    type: CREATE_CATEGORY_FIRST
  }
}

function fetchCategories() {
  return async (dispatch) => {
    try {
      dispatch(loadCategories())
      const res = await categoryFirstService.all()
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
