import React from 'react';
import classNames from 'classnames';
import {
  AUTHOR,
  GITHUB,
  BLOG
} from '../constants';
import { Icon } from 'antd';

export default function Copyright({ className }) {
  const classes = classNames('page-copyright', className);
  return (
    <footer className={classes}>
      <p>
        BLOG&nbsp;
        <a href={BLOG} target="view_window">
          {BLOG}
        </a>
        &nbsp;&nbsp;
        <span className="social">
          <a href={GITHUB} target="view_window">
            <Icon type="github" style={{color: "#fff"}}/>
          </a>
        </span>
      </p>
      <p>
        WEBSITE BY {AUTHOR}
      </p>
      <p>
        &copy; 2018. ALL RIGHT RESERVED.
      </p>
      <div className="social">
      </div>
    </footer>
  )
}
