import React from 'react';
import PropTypes from 'prop-types';
import {
  Link
} from 'react-router-dom';
import {
  Layout,
  Icon,
  Menu,
  Dropdown
} from 'antd';
const { Header } = Layout;

export default class Navbar extends React.Component {
  static propTypes = {
    collapsed: PropTypes.bool.isRequired,
    handleClick: PropTypes.func.isRequired
  }

  handleSignout = () => {
    console.log(666)
    console.log(this.props)
    this.props.signout()
  }

  renderOverlay() {
    return (
      <Menu onClick={this.handleSignout}>
        <Menu.Item>
          {/* <Link to="/signin"> */}
            退出
          {/* </Link> */}
        </Menu.Item>
      </Menu>
    )
  }

  render() {
    const menu = this.renderOverlay()

    return (
      <Header>
        <nav className="navbar">
          <ul className="nav">
            <li className="nav-item">
              <Icon
                className="sidebar-trigger"
                type={this.props.collapsed ? 'menu-unfold': 'menu-fold'}
                onClick={this.props.handleClick}
              />
            </li>
          </ul>
          <ul className="nav navbar-right">
            <Dropdown
              overlay={menu}
            >
              <li className="nav-item">
                <Icon
                  type="user"
                />
              </li>
            </Dropdown>
          </ul>
        </nav>
      </Header>
    )
  }
}
