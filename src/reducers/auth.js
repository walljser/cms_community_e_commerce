import * as Types from '../actions/types';
import { isEmpty } from 'lodash';

const initialState = {
  error: '',
  isFetching: false,
  isAuthenticated: false,
  admin: {}
}

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case Types.FETCH_TOKEN:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        admin: {}
      })
    case Types.SET_CURRENT_USER:
      return Object.assign({}, state, {
        error: '',
        isFetching: false,
        isAuthenticated: !isEmpty(action.admin),
        admin: action.admin
      })
    case Types.AUTH_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        admin: {},
        error: action.payload
      })
    default: return state
  }
}
