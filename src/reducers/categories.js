import {
  LOAD_CATEGORIES_FIRST,
  FINISH_CATEGORIES_FIRST,
  LOAD_CATEGORIES_SECOND,
  FINISH_CATEGORIES_SECOND
} from '../actions/types';

const initialState = {
  first: {
    categories: [],
    isFetching: false
  },
  second: {
    categories: [],
    isFetching: false
  }
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_CATEGORIES_FIRST:
      return Object.assign({}, state, {
        first: {
          isFetching: true,
          categories: state.first.categories
        }
      })
    case FINISH_CATEGORIES_FIRST:
      return Object.assign({}, state, {
        first: {
          isFetching: false,
          categories: action.payload
        }
      })
    case LOAD_CATEGORIES_SECOND:
      return Object.assign({}, state, {
        second: {
          isFetching: true,
          categories: state.second.categories
        }
      })
    case FINISH_CATEGORIES_SECOND:
      return Object.assign({}, state, {
        second: {
          isFetching: false,
          categories: action.payload
        }
      })
    default:
      return state
  }
}
