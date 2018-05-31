import { LOAD_ADVS, LOAD_ADVS_FAILURE, LOAD_ADVS_SUCCESS } from "../actions/types";

const initialState = {
  advs: [],
  isFetching: false,
  errorMessage: ''
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_ADVS:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case LOAD_ADVS_FAILURE: {
      return Object.assign({}, state, {
        isFetching: false,
      })
      break;
    }
    case LOAD_ADVS_SUCCESS: {
      return Object.assign({}, state, {
        isFetching: false,
        advs: action.payload
      })
    }
    default:
      return state
  }
}
