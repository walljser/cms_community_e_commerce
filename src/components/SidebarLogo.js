import React from 'react';
import {
  WEBSITE_NAME
} from '../constants';
import logo from '../assets/images/logo.png';

const SidebarLogo = () => {
  return (
    <div className="sidebar-logo">
      <img src={logo} alt="..."/>
      <h2 className="sidebar-logo-content">{WEBSITE_NAME}</h2>
    </div>
  )
}

export default SidebarLogo
