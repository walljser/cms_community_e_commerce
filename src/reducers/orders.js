import {
  LOAD_ORDERS,
  RECEIVE_ORDERS,
  STATISTICS_ORDER,
} from '../actions/types';

const initialState = {
  isFetchingOrders: false,
  orders: [],
  success: 0,
  successToday: 0,
  wait: 0,
  waitToday: 0,
  dispatching: 0,
  refunding: 0,
  totalSale: 0,
  todaySale: 0,
  collection: 0,
  userCount: 0
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_ORDERS: {
      return Object.assign({}, state, {
        isFetchingOrders: true
      })
    }
    case RECEIVE_ORDERS: {
      return Object.assign({}, state, {
        isFetchingOrders: false,
        orders: action.payload
      })
    }
    case STATISTICS_ORDER: {
      return Object.assign({}, state, {
        success: action.payload.success,
        successToday: action.payload.successToday,
        wait: action.payload.wait,
        waitToday: action.payload.waitToday,
        dispatching: action.payload.dispatching,
        refunding: action.payload.refunding,
        totalSale: action.payload.totalSale,
        todaySale: action.payload.todaySale,
        collection: action.payload.collection,
        userCount: action.payload.userCount
      })
    }
    default:
      return state
  }
}
