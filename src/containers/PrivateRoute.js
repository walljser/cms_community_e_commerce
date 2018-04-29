import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Route,
  Redirect
} from 'react-router-dom';
// import storage from '../utils';
// import {
//   USER_ID,
//   TOKEN
// } from '../constants';

@connect(
  state => {
    return {
      isAuthenticated: state.auth.isAuthenticated
    }
  }
)
export default class PrivateRoute extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  }

  static state = {
    isAuthenticated: false
  }

  // componentWillMount() {
  //   const userId = storage.getStorage(USER_ID)
  //   const token = storage.getStorage(TOKEN)

  //   if (token && userId) {
  //     this.setState({
  //       isAuthenticated: true
  //     })
  //   }
  // }

  handleRender = () => {
    const {
      component: ComposedComponent
    } = this.props

    if(this.props.isAuthenticated) {
      return (
        <ComposedComponent {...this.props} />
      )
    } else {
      return (
        <Redirect
          to={{
            pathname: '/signin',
            state: {
              from: this.props.location,
              message: '请您先登录，谢谢！'
            }
          }}
        />
      )
    }
  }

  render() {
    const {
      component,
      ...rest
    } = this.props

    return (
      <Route {...rest} render={this.handleRender} />
    )
  }
}
