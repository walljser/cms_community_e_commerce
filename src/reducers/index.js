import { combineReducers } from 'redux';
import {
  routerReducer
} from 'react-router-redux';
import auth from './auth';
import users from './users';
import goods from './goods';
import categories from './categories';
import service from './service';
import orders from './orders';
import adminInfo from './adminInfo';
import advs from './advs';

export default combineReducers({
  auth,
  users,
  goods,
  categories,
  service,
  orders,
  adminInfo,
  advs,
  router: routerReducer
});
