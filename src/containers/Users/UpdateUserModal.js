import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  Button,
  message,
  Modal,
  Form,
  Input
} from 'antd';
import {
  authError,
  fetchUsers
} from '../../actions/index';

import userService from '../../services/userService';


const FormItem = Form.Item


@connect(
  state => ({
    adminId: state.auth.admin.adminId,
    token: state.auth.admin.token
  }),
  dispatch => ({
    authError: (errorMessage) => dispatch(authError(errorMessage)),
    fetchUsers: (adminId,token) => dispatch(fetchUsers(adminId,token))
  })
)

@Form.create()

export default class UpdateUserModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    value: PropTypes.object.isRequired
  }

  // 提交事件
  handleSubmit = (e) => {
    e.preventDefault()

    this.props.form.validateFields((err, values) => {
      console.log(values)
      if (err) {
        return;
      }

      // 调用本类更新方法
      this.updateUser(values);

    })
  }

  updateUser = async (user) => {
    const {
      adminId,
      token
    } = this.props

    try {
      //调用更新 api
      console.log("update user");
      const res = await userService.update(
        adminId,
        token,
        user
      )
      message.success('修改成功');
      this.props.fetchUsers(adminId,token);
      this.props.handleSubmit();
    } catch (err) {
      console.log("err");
      console.log(err);
      if (err.message === undefined) {
        const errorMessage = '服务器出错啦，请耐心等待，麻烦很耐心的等待一年，谢谢'
        this.props.authError(errorMessage)
      }
      if (!err.response) {
        this.props.authError(err);
      }
      if (err.response.status === 401) {
        const errorMessage = '您的登录已过期，请重新登录'
        this.props.authError(errorMessage)
      }
      // 修改不成功
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
      handleSubmit,
      form,
      value
    } = this.props

    const {getFieldDecorator} = form;//字段
    const userId = value ? value.userId : ''
    const userName = value ? value.userName : ''
    const nickName = value ? value.nickName : ''

    return (
      <Modal
        visible={visible}
        title="修改用户信息"
        okText="修改"
        cancelText="取消"
        onCancel={handleCancel}
        onOk={this.handleSubmit}
      >
        <Form layout="vertical">
          <FormItem label="id">
            {getFieldDecorator('userId', {
              initialValue: userId
            })(
              <Input type="text" disabled/>
            )}
          </FormItem>
          <FormItem label="用户账号">
            {getFieldDecorator('userName', {
              rules: [{
                required: true,
                message: '请输入账号'
              }, {
                max: 100,
                min: 1,
                message: '用户账号不能超过100个字符'
              }],
              initialValue: userName
            })(
              <Input type="text"/>
            )}
          </FormItem>
          <FormItem label="用户昵称">
            {getFieldDecorator('nickName', {
              rules: [{
                required: true,
                message: '请输入昵称'
              }, {
                max: 100,
                min: 1,
                message: '用户昵称不能超过100个字符'
              }],
              initialValue: nickName
            })(
              <Input type="text"/>
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }

}
