import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Modal,
  Form,
  Input,
  message
} from 'antd';
import {
  authError
} from '@/actions';
import goodService from '@/services/goodService';
import CategorySelector from '../../components/CategorySelector';

const FormItem = Form.Item

@connect(
  state => ({
    adminId: state.auth.admin.adminId,
    token: state.auth.admin.token
  }),
  dispatch => ({
    authError: (errorMessage) => dispatch(authError(errorMessage))
  })
)
@Form.create()
export default class UpdateGoodModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    adminId: PropTypes.number.isRequired,
    token: PropTypes.string.isRequired,
    authError: PropTypes.func.isRequired
  }

  state = {
    imageChanged: false
  }

  handleCancel = () => {
    this.props.form.resetFields()
    this.props.handleCancel()
  }

  handleUpdate = (e) => {
    e.preventDefault()

    this.props.form.validateFields((err, values) => {
      console.log(values)
      if (err) {
        return ;
      }

      this.updateGood(values)
    })
  }

  updateGood = async (good) => {
    const {
      adminId,
      token,
      handleSubmit,
      authError
    } = this.props

    try {
      const res = await goodService.update(
        adminId,
        token,
        good
      )
      message.success("修改成功")
      handleSubmit()
      this.props.form.resetFields()
    } catch (err) {
      if (err.response === undefined) {
        const errorMessage = '服务器错误，请稍后再试'
        authError(errorMessage)
      }
      if (err.response.status === 401) {
        const errorMessage = '您的登录已过期，请重新登录'
        authError(errorMessage)
      }
      if (err.response.status === 400 || err.response.status === 404) {
        const errorMessage = err.response.data.message
        message.error(errorMessage)
      }
    }
  }

  render() {
    const {
      visible,
      handleCancel,
      form
    } = this.props

    const { getFieldDecorator } = form
    console.log(this.props.updateForm)
    let updateForm = this.props.updateForm || {}

    return (
      <Modal
        visible={visible}
        title="更新商品"
        okText="更新"
        cancelText="取消"
        onCancel={this.handleCancel}
        onOk={this.handleUpdate}
      >
        <Form layout="vertical">
          <FormItem label="商品id:">
            {getFieldDecorator('goodId', {
              initialValue: updateForm.goodId || ''
            })(
              <Input disabled />
            )}
          </FormItem>
          <FormItem label="商品名称:">
            {getFieldDecorator('goodName', {
              initialValue: updateForm.goodName || '',
              rules: [{
                isRequired: true,
                message: '请输入商品名称'
              }, {
                max: 20,
                min: 1,
                message: '商品名称不能超过20个字符'
              }]
            })(
              <Input type="text" />
            )}
          </FormItem>
          <FormItem label="商品类别：">
            {getFieldDecorator('categorySecondId', {
              initialValue: updateForm.categorySecondId || '',
              rules: [{
                required: true,
                message: '请选择商品类别'
              }]
            })(
              <CategorySelector />
            )}
          </FormItem>
          <FormItem label="现价:">
            {getFieldDecorator('price', {
              initialValue: '' + updateForm.price || '',
              rules: [{
                isRequired: true,
                message: '请输入商品价格'
              }, {
                max: 10,
                min: 1,
                message: '商品价格不能超过10位数'
              }]
            })(
              <Input type="number"/>
            )}
          </FormItem>
          <FormItem label="原价:">
            {getFieldDecorator('originalPrice', {
              initialValue: '' + updateForm.originalPrice || '',
              rules: [{
                isRequired: true,
                message: '请输入商品价格'
              }, {
                max: 10,
                min: 1,
                message: '商品原价不能超过10位数'
              }]
            })(
              <Input type="number"/>
            )}
          </FormItem>
          <FormItem label="规格:">
            {getFieldDecorator('spec', {
              initialValue: updateForm.spec || '',
              rules: [{
                isRequired: true,
                message: '请输入商品规格'
              }]
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="原产地:">
            {getFieldDecorator('origin', {
              initialValue: updateForm.origin || '',
              rules: [{
                isRequired: true,
                message: '请输入商品的原产地'
              }]
            })(
              <Input />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}
