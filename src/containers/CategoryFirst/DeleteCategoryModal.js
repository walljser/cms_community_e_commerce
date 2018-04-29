import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import categoryService from '@/services/categoryService';
import {
  message,
  Modal,
  Spin
} from 'antd';
import {
  authError,
  fetchCategories
} from '@/actions';

@connect(
  state => ({
    adminId: state.auth.admin.adminId,
    token: state.auth.admin.token
  }),
  dispatch => ({
    authError: (errorMessage) => dispatch(authError(errorMessage)),
    fetchCategories: () => dispatch(fetchCategories())
  })
)
export default class DeleteCategoryModal extends React.Component {
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
    const categoryId = value.categoryId

    try {
      await categoryService.remove(adminId, token, categoryId)
      message.success("删除成功")
      this.props.fetchCategories()
      this.props.handleSubmit()
    } catch (err) {
      if (err.message === undefined) {
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
      this.props.fetchCategories()
      this.props.handleCancel()
    }
  }

  render() {
    const {
      value
    } = this.props

    const categoryName = value ? value.categoryName : ''

    return (
      <Modal
        title={`删除分类`}
        visible={this.props.visible}
        okText="确认"
        cancelText="取消"
        onOk={this.handleConfirm}
        onCancel={this.props.handleCancel}
      >
        <p>
          {
            categoryName ? (
              '确认要删除分类信息：' + categoryName
            ) : ''
          }
        </p>
      </Modal>
    )
  }
}
