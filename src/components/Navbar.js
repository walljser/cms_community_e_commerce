import React from 'react';
import PropTypes from 'prop-types';
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

  renderOverlay() {
    return (
      <Menu>
        <Menu.Item>
          <a href="">修改密码</a>
        </Menu.Item>
        <Menu.Item>
          <a href="">退出</a>
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
