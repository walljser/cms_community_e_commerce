import React from 'react';
import classNames from 'classnames';
import {
  AUTHOR,
  GITHUB
} from '../constants';
import { Icon } from 'antd';

export default function Copyright({ className }) {
  const classes = classNames('page-copyright', className);
  return (
    <footer className={classes}>
      <p>
        WEBSITE BY {AUTHOR}
      </p>
      <p>
        &copy; 2018. ALL RIGHT RESERVED.
      </p>
      <div className="social">
        <a href={GITHUB}>
          <Icon type="github" style={{color: "#fff"}}/>
        </a>
      </div>
    </footer>
  )
}
