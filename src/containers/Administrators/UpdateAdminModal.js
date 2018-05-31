import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  message,
  Modal,
  Form,
  Radio,
  Input
} from 'antd';
import {
  authError,
  fetchAdminList
} from '@/actions/index';
import adminInfoService from '@/services/adminInfoService';

const FormItem = Form.Item
const RadioGroup = Radio.Group

@connect(
  state => ({
    adminId: state.auth.admin.adminId,
    token: state.auth.admin.token
  }),
  dispatch => ({
    authError: (errorMessage) => authError(errorMessage),
    fetchAdmins: (adminId, token) => dispatch(fetchAdminList(adminId, token))
  })
)
@Form.create()
export default class UpdateAdminModal extends React.Component {
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

  updateCategory = async (admin) => {
    const {
      adminId,
      token
    } = this.props

    try {
      const res = await adminInfoService.update(
        adminId,
        token,
        admin
      )
      message.success('修改成功')
      this.props.fetchAdmins(adminId, token)
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
    const administratorId = value ? value.administratorId: ''
    const passWord = value ? value.passWord : ''
    const nickName = value ? value.nickName : ''
    const phone = value ? value.phone : ''
    const superLevel = value ? value.superLevel : ''

    return (
      <Modal
        visible={visible}
        title="修改管理员信息"
        okText="修改"
        cancelText="取消"
        onCancel={handleCancel}
        onOk={this.handleSubmit}
      >
        <Form layout="vertical">
          <FormItem label="管理员id">
            {getFieldDecorator('administratorId', {
              require: [{
                required: true,
                message: '请输入管理员id'
              }],
              initialValue: administratorId
            })(
              <Input type="text" disabled/>
            )

            }
          </FormItem>
          <FormItem label="密码">
            {getFieldDecorator('passWord', {
              rules: [{
                required: true,
                message: '请输入密码'
              }, {
                max: 30,
                min: 1,
                message: '密码不能超过30个字符'
              }],
              initialValue: passWord
            })(
              <Input type="text" />
            )}
          </FormItem>
          <FormItem label="昵称">
            {getFieldDecorator('nickName', {
              rules: [{
                required: true,
                message: '请输入昵称'
              }, {
                max: 20,
                min: 1,
                message: '昵称不能超过20个字符'
              }],
              initialValue: nickName
            })(
              <Input type="text" />
            )}
          </FormItem>
          <FormItem label="手机号码">
            {getFieldDecorator('phone', {
              rules: [{
                required: true,
                message: '请输入手机号码'
              }],
              initialValue: phone
            })(
              <Input type="number" />
            )}
          </FormItem>
          <FormItem label="是否为超级管理员">
            {getFieldDecorator('superLevel', {
              rules: [{
                required: true,
                message: '请选择管理员权限'
              }],
              initialValue: superLevel
            })(
              <RadioGroup>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </RadioGroup>
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}
