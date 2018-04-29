import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function Body(props) {
  const {
    type,
    className,
    prefixCls,
    children
  } = props

  const classes = classNames(
    className,
    `${prefixCls}-body`,
    {
      [`${prefixCls}-light`]: type === 'light'
    }
  )

  return (
    <div className={classes}>
      {children}
    </div>
  )
}

Body.defaultProps = {
  prefixCls: 'panel'
}

Body.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string
}

export default Body;
