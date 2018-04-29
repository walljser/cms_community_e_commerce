import {
  LOAD_CATEGORIES,
  FINISH_CATEGORIES
} from '../actions/types';

const initialState = {
  categories: [],
  isFetching: false
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_CATEGORIES:
      return Object.assign({}, state, {
        isFetching: true
      })
    case FINISH_CATEGORIES:
      return Object.assign({}, state, {
        isFetching: false,
        categories: action.payload
      })
    default:
      return state
  }
}
