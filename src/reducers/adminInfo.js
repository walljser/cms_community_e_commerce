import {
  LOAD_ADMIN_INFO,
  LOAD_ADMIN_INFO_SUCCESS,
  LOAD_ADMIN_INFO_FAILURE
} from '../actions/types';

const initialState = {
  isFetching: false,
  errorMessage: '',
  admins: []
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_ADMIN_INFO:
      return Object.assign({}, state, {
        isFetching: true
      })
    case LOAD_ADMIN_INFO_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        admins: action.payload
      })
    case LOAD_ADMIN_INFO_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.payload
      })
    default:
      return state
  }
}
