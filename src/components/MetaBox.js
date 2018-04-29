import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Card
} from 'antd';

export default class extends React.Component {
  static defaultProps = {
    prefixCls: 'dashboard-metabox'
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.node,
    info: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    desc: PropTypes.string
  }

  render() {
    const {
      prefixCls,
      title,
      className,
      icon,
      info,
      desc,
      children
    } = this.props

    const classes = classNames(
      className,
      `${prefixCls}`
    )
    const titleClasses = `${prefixCls}-title`
    const infoClasses = `${prefixCls}-info`
    const descClasses = `${prefixCls}-desc`
    const contentClasses = `${prefixCls}-content`

    return (
      <Card hoverable>
        <div className={classes}>
          <h4 className={titleClasses}>
            {title}
            <Tooltip placement="topLeft" title="指标提示">
              {icon}
            </Tooltip>
          </h4>
          <div className={infoClasses}>
            {
              String(info).split('.')[0]
            }
          </div>
          <div className={contentClasses}>
            {children}
          </div>
          <div className={descClasses}>
            {desc}
          </div>
        </div>
      </Card>
    )
  }
}
