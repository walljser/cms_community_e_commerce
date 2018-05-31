import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import advService from '@/services/advService';
import {
  message,
  Modal,
  Spin
} from 'antd';
import {
  authError,
  getAllAdvs
} from '@/actions';

@connect(
  state => ({
    adminId: state.auth.admin.adminId,
    token: state.auth.admin.token
  }),
  dispatch => ({
    authError: (errorMessage) => dispatch(authError(errorMessage)),
    fetchAdvs: () => dispatch(getAllAdvs())
  })
)
export default class DeleteAdvModal extends React.Component {
  static propTypes = {
    adminId: PropTypes.number.isRequired,
    token: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    value: PropTypes.object.isRequired
  }

  handleConfirm = async () => {
    const {
      adminId,
      token,
      value
    } = this.props
    const advSwiperId = value.advSwiperId

    try {
      await advService.remove(adminId, token, advSwiperId)
      message.success("删除成功")
      this.props.fetchAdvs()
      this.props.handleSubmit()
    } catch (err) {
      if (err.response === undefined) {
        const errorMessage = '服务器出错啦，请耐心等待，麻烦很耐心的等待一年，谢谢'
        this.props.authError(errorMessage)
      }
      if (err.response.status === 401) {
        const errorMessage = '您的登录已过期，请重新登录'
        this.props.authError(errorMessage)
      }
      // 删除不成功
      if (err.response.status === 400 || err.response.status === 404) {
        const errorMessage = err.response.data.message
        message.error(errorMessage)
      }
      this.props.fetchAdvs()
      this.props.handleCancel()
    }
  }

  render() {
    const {
      value
    } = this.props

    const name = value ? value.name : ''

    return (
      <Modal
        title={`删除广告`}
        visible={this.props.visible}
        okText="确认"
        cancelText="取消"
        onOk={this.handleConfirm}
        onCancel={this.props.handleCancel}
      >
        <p>
          {
            name ? (
              '确认要删除广告：' + name
            ) : ''
          }
        </p>
      </Modal>
    )
  }
}
