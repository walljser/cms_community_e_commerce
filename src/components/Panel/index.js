import React from 'react';
import classNames from 'classnames';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

export default class Panel extends React.Component {
  static Header = Header
  static Body = Body
  static Footer = Footer

  static defaultProps = {
    prefixCls: 'panel'
  }

  render() {
    const {
      prefixCls,
      children,
      minus,
      ...otherProps
    } = this.props

    const classes = classNames(
      `${prefixCls}`,
      {
        [`${prefixCls}-minus`]: minus
      }
    )

    return (
      <div className={classes} {...otherProps}>
        {children}
      </div>
    )
  }
}
