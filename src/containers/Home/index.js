import React from 'react';
import { connect } from 'react-redux';
import {
  Route
} from 'react-router-dom';
import {
  Layout
} from 'antd';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Users from '../Users/index';
import Goods from '../Goods/index';
import CategoryFirst from '../CategoryFirst/index';
import Orders from '../Orders/index';
import Dashboard from '../Dashboard/index';
import Advs from '../Advs/index';
import CategorySecond from '../CategorySecond/index';
import Administrators from '../Administrators';
import OrderRefund from '../OrderRefund/index';
import OrderDispatch from '../OrderDispatch/index';
import {
  signout
} from '../../actions';

@connect(
  state => ({
    adminId: state.auth.admin.adminId,
    token: state.auth.admin.token
  }),
  dispatch => ({
    signout: () => dispatch(signout())
  })
)
export default class Home extends React.Component {
  state = {
    collapsed: false,
    superLevel: true
  }

  handleLogout = () => {
    this.props.signout()
  }

  toggleCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render() {
    const superLevel = this.state.superLevel

    return (
      <div className="page page-home">
        <Layout>
          <Sidebar collapsed={this.state.collapsed} permission={superLevel}/>
          <Layout>
            <Navbar
              collapsed={this.state.collapsed}
              handleClick={this.toggleCollapse}
              signout={this.handleLogout}
            />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/users" component={Users} />
            <Route path="/goods" component={Goods} />
            <Route path="/category/first" component={CategoryFirst} />
            <Route path="/category/second" component={CategorySecond} />
            <Route path="/orders" component={Orders} />
            <Route path="/order/refund" component={OrderRefund} />
            <Route path="/order/dispatch" component={OrderDispatch} />
            <Route path="/advertisments" component={Advs} />
            <Route path="/admins" component={Administrators} />
            {/* <Route paht="/admins" component={Administrators} /> */}
          </Layout>
        </Layout>
      </div>
    )
  }
}
