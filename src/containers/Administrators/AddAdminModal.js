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
} from '../../actions';
import adminInfoService from '../../services/adminInfoService';

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
export default class AddAdminModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    authError: PropTypes.func.isRequired,
    fetchAdmins: PropTypes.func.isRequired
  }

  fetchAdmins = async () => {
    const {
      adminId,
      token,
      fetchAdmins
    } = this.props

    await fetchAdmins(adminId, token)
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.props.form.validateFields((err, values) => {
      if (err) {
        return ;
      }

      this.postAdmin(values.userName, values.passWord, values.nickName, values.phone, values.superLevel)
    })
  }

  postAdmin = async (userName, passWord, nickName, phone, superLevel) => {
    const {
      adminId,
      token
    } = this.props

    try {
      const res = await adminInfoService.create(
        adminId,
        token,
        {
          userName,
          passWord,
          nickName,
          phone,
          superLevel
        }
      )
      message.success('添加新管理员成功')
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
        title="添加管理员"
        okText="添加"
        cancelText="取消"
        onCancel={handleCancel}
        onOk={this.handleSubmit}
      >
        <Form layout="vertical">
          <FormItem label="用户名">
            {getFieldDecorator('userName', {
              rules: [{
                required: true,
                message: '请输入用户名'
              }, {
                max: 30,
                min: 1,
                message: '用户名不能超过30个字符'
              }]
            })(
              <Input type="text" />
            )}
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
              }]
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
              }]
            })(
              <Input type="text" />
            )}
          </FormItem>
          <FormItem label="手机号码">
            {getFieldDecorator('phone', {
              rules: [{
                required: true,
                message: '请输入手机号码'
              }, {
                max: 12,
                min: 1,
                message: '手机号码不能超过12字符'
              }]
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
              initialValue: false
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
