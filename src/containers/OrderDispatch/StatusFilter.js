import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function StatusFilter(props) {
  const {
    status,
    prefixCls,
    className
  } = props

  let content = ''
  if (status === 0) {
    content = '未发货'
  } else if (status === 1) {
    content = '配送中'
  } else if (status === 2) {
    content = '已完成'
  } else if (status === -1) {
    content = '退款中'
  }

  const classes = classNames(
    className,
    {
      [`${prefixCls}-success`]: status === 2,
      [`${prefixCls}-error`]: status === -1,
      [`${prefixCls}-warning`]: status === 0,
      [`${prefixCls}`]: status === 1
    }
  )

  return (
    <span className={classes}>
      {content}
    </span>
  )
}

StatusFilter.propTypes = {
  status: PropTypes.number.isRequired
}

StatusFilter.defaultProps = {
  prefixCls: 'status'
}

export default StatusFilter
