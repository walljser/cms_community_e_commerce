import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  message,
  Modal,
  Form,
  Input
} from 'antd';
import {
  authError,
  fetchCategories
} from '@/actions/index';
import categoryService from '@/services/categoryService';

const FormItem = Form.Item

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
@Form.create()
export default class UpdateCategoryModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    value: PropTypes.object.isRequired
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.props.form.validateFields((err, values) => {
      console.log(values)
      if (err) {
        return ;
      }

      this.updateCategory(values)
    })
  }

  updateCategory = async (category) => {
    const {
      adminId,
      token
    } = this.props

    try {
      const res = await categoryService.update(
        adminId,
        token,
        category
      )
      message.success('修改成功')
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
      // 修改不成功
      if (err.response.status === 400 ||err.response.status === 404) {
        const errorMessage = err.response.data.message
        message.error(errorMessage)
      }
    }
  }

  render() {
    const {
      visible,
      handleCancel,
      handleSubmit,
      form,
      value
    } = this.props

    const { getFieldDecorator } = form
    const categoryId = value ? value.categoryId : ''
    const categoryName = value ? value.categoryName : ''

    return (
      <Modal
        visible={visible}
        title="修改分类信息"
        okText="修改"
        cancelText="取消"
        onCancel={handleCancel}
        onOk={this.handleSubmit}
      >
        <Form layout="vertical">
          <FormItem label="id">
            {getFieldDecorator('categoryId', {
              initialValue: categoryId
            })(
              <Input type="text" disabled />
            )}
          </FormItem>
          <FormItem label="分类名称">
            {getFieldDecorator('categoryName', {
              rules: [{
                required: true,
                message: '请输入分类名称'
              }, {
                max: 10,
                min: 1,
                message: '商品名称不能超过10个字符'
              }],
              initialValue: categoryName
            })(
              <Input type="text" />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}
