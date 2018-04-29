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
export default class BePutInStorage extends React.Component {
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

  handleConfirm = (e) => {
    e.preventDefault()

    this.props.form.validateFields((err, values) => {
      console.log(values)
      if (err) {
        return ;
      }

      this.putIn(values.putInNumber)
    })
  }

  putIn = async (putInNumber) => {
    const {
      adminId,
      token,
      handleSubmit,
      authError,
      good
    } = this.props

    try {
      const res = await goodService.inventory(
        adminId,
        token,
        good.goodId,
        putInNumber
      )
      message.success("入库成功")
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
    let good = this.props.good || {}

    return (
      <Modal
        visible={visible}
        title={`${good.goodName} 入库`}
        okText="入库"
        cancelText="取消"
        onCancel={this.handleCancel}
        onOk={this.handleConfirm}
      >
        <Form layout="vertical">
          <FormItem label="库存:">
            {getFieldDecorator('price', {
              initialValue: '' + good.price || '',
              rules: [{
                isRequired: true,
                message: '请输入商品价格'
              }, {
                max: 10,
                min: 1,
                message: '商品价格不能超过10位数'
              }]
            })(
              <Input type="number" disabled/>
            )}
          </FormItem>
          <FormItem label="入库数量:">
            {getFieldDecorator('putInNumber', {
              initialValue: 0,
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
        </Form>
      </Modal>
    )
  }
}
