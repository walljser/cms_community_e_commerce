import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@/components/Panel';
import {
  Breadcrumb,
  Form,
  Row,
  Col,
  Button,
  Select,
  DatePicker,
  Divider,
  Input
} from 'antd';
import { ORDER_WAIT, ORDER_DISPATCHING, ORDER_FINISH, ORDER_REFUNDING } from '../../constants';

const FormItem = Form.Item
const Option = Select.Option

@Form.create()
export default class SelectorHeader extends React.Component {
  static propTypes = {
    handleSelectorChange: PropTypes.func.isRequired
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.props.form.validateFields((err, values) => {
      if (err) {
        return ;
      }

      if (values.categoryId === 'all') {
        values.categoryId = null
      }

      if (values.status === 'all') {
        values.status = null
      }

      this.props.handleSelectorChange(values)
    })
  }

  handleReset = () => {
    this.props.form.setFieldsValue({
      goodId: undefined,
      goodName: '',
      categoryId: 'all',
      status: 'all'
    })
  }

  onDateChange = (date, dateString) => {
    console.log(date, dateString);
  }

  handleStatusChange = (value) => {
    this.props.form.setFieldsValue({
      status: value
    })
  }

  render() {
    const {
      form
    } = this.props

    const { getFieldDecorator } = form

    return (
      <Panel.Header type="light">
        <Breadcrumb>
          <Breadcrumb.Item>主页</Breadcrumb.Item>
          <Breadcrumb.Item>订单管理</Breadcrumb.Item>
          <Breadcrumb.Item>订单查询</Breadcrumb.Item>
        </Breadcrumb>
        <h2>订单查询</h2>
        <p>展示全部订单信息，组合查询订单信息</p>
        <Divider style={{marginTop: '10px', marginBottom: '30px'}} />
        <Form className="form-search" onSubmit={this.handleSubmit}>
          <Row gutter={24}>
            <Col span={4}>
              <FormItem label="id">
                {getFieldDecorator('orderId')(
                  <Input type="number" />
                )}
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem
                className="form-flex-wrapper"
                label="用户名称"
              >
                {getFieldDecorator('userName', {
                  initialValue: ""
                })(
                  <Input type="text" />
                )}
              </FormItem>
            </Col>
            <Col span={7}>
              <FormItem label="时间:">
                {getFieldDecorator('createTime', {
                  initialValue: ''
                })(
                  <DatePicker.RangePicker style={{marginLeft: '10px'}}/>
                )}
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem label="订单状态:">
                {getFieldDecorator('status', {
                  initialValue: 'all'
                })(
                  <Select
                    onChange={this.handleStatusChange}
                  >
                    <Option value="all">全部</Option>
                    <Option value={ORDER_WAIT}>待发货</Option>
                    <Option value={ORDER_DISPATCHING}>配送中</Option>
                    <Option value={ORDER_FINISH}>已完成</Option>
                    <Option value={ORDER_REFUNDING}>退款中</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={4} style={{textAlign: 'right'}}>
              <Button
                type="primary"
                htmlType="submit"
              >
                搜索
              </Button>
              <Divider type="vertical"/>
              <Button type="dashed" onClick={this.handleReset}>重置</Button>
            </Col>
          </Row>
        </Form>
      </Panel.Header>
    )
  }
}
