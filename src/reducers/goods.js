import {
  LOAD_GOODS,
  RECEIVE_GOODS,
  CREATE_GOOD,
  CREATE_SUCCESS,
  CREATE_FAILURE,
} from '../actions/types';

const initialState = {
  isFetching: false,
  goods: [],
  pageNum: 1,
  pages: 1,
  total: 1
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_GOODS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_GOODS:
      return Object.assign({}, state, {
        isFetching: false,
        goods: action.goods.list,
        pages: action.goods.pages,
        pageNum: action.goods.pageNum,
        total: action.goods.total
      })
    default:
      return state
  }
}
