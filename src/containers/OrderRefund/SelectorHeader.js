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
  Radio,
  Input
} from 'antd';
import { ORDER_WAIT, ORDER_DISPATCHING, ORDER_FINISH, ORDER_REFUNDING } from '../../constants';

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group
const RadioButton = Radio.Button

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

      this.props.handleSelectorChange(values)
    })
  }

  handleReset = () => {
    this.props.form.setFieldsValue({
      orderId: undefined,
      userName: '',
      createTime: undefined
    })
  }

  onDateChange = (date, dateString) => {
    console.log(date, dateString);
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
          <Breadcrumb.Item>退货处理</Breadcrumb.Item>
        </Breadcrumb>
        <h2>
          退货处理
          {/* <RadioGroup onChange={this.handleStatusChange} defaultValue={status} style={{float: 'right'}}>
            <RadioButton value={ORDER_REFUND}>待发货</RadioButton>
            <RadioButton value={ORDER_DISPATCHING}>配送中</RadioButton>
          </RadioGroup> */}
        </h2>
        <p>管理客户的退货请求，查看待处理的退货请求，可以进行拒绝和接受退货请求操作。</p>
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
            <Col span={8} style={{textAlign: 'right'}}>
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
