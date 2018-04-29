import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { connect } from 'react-redux';
import PrivateRoute from './containers/PrivateRoute';
import Login from './containers/Login';
import Home from './containers/Home/index';
import * as storage from './utils/storage';
import {
  ADMIN_ID,
  TOKEN
} from './constants';
import {
  setCurrentUser
} from './actions'

@connect(
  state => {
    return {
      isAuthenticated: state.auth.isAuthenticated
    }
  },
  dispatch => ({
    setCurrentUser: (user) => {
      return dispatch(setCurrentUser(user))
    }
  })
)
export default class Routes extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    setCurrentUser: PropTypes.func.isRequired
  }

  componentWillMount() {
    const adminId = parseInt(storage.getStorage(ADMIN_ID), 10)
    const token = storage.getStorage(TOKEN)

    if (adminId && token) {
      this.props.setCurrentUser({
        adminId,
        token
      })
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/signin" component={Login}/>
          <PrivateRoute exract component={Home}/>
        </Switch>
      </Router>
    )
  }
}
