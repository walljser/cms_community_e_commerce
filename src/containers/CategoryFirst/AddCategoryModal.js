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
} from '../../actions';
import categoryService from '../../services/categoryService';

const FormItem = Form.Item

@connect(
  state => ({
    adminId: state.auth.admin.adminId,
    token: state.auth.admin.token
  }),
  dispatch => ({
    authError: (errorMessage) => authError(errorMessage),
    fetchCategories: () => dispatch(fetchCategories())
  })
)
@Form.create()
export default class AddCategoryModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    authError: PropTypes.func.isRequired,
    fetchCategories: PropTypes.func.isRequired
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.props.form.validateFields((err, values) => {
      console.log(values)
      if (err) {
        return ;
      }

      this.postCategory(values.categoryName)
    })
  }

  postCategory = async (categoryName) => {
    const {
      adminId,
      token
    } = this.props

    try {
      const res = await categoryService.create(
        adminId,
        token,
        categoryName
      )
      message.success('添加新分类成功')
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
      // 添加不成功
      if (err.response.status === 400) {
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
      form
    } = this.props

    const { getFieldDecorator } = form

    return (
      <Modal
        visible={visible}
        title="新增分类"
        okText="保存"
        cancelText="取消"
        onCancel={handleCancel}
        onOk={this.handleSubmit}
      >
        <Form layout="vertical">
          <FormItem label="分类名称">
            {getFieldDecorator('categoryName', {
              rules: [{
                required: true,
                message: '请输入分类名称'
              }, {
                max: 10,
                min: 1,
                message: '商品名称不能超过10个字符'
              }]
            })(
              <Input type="text" />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}
