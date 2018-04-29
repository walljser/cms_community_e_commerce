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
  Divider,
  Input
} from 'antd';
import CategorySelector from '@/components/CategorySelector';

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
      console.log(values)

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
      <Panel.Header style={{backgroundColor: '#fff'}}>
        <Breadcrumb>
          <Breadcrumb.Item>主页</Breadcrumb.Item>
          <Breadcrumb.Item>商品列表</Breadcrumb.Item>
        </Breadcrumb>
        <h2>商品列表</h2>
        <p>仓库商品信息展示，可以进行新增商品，编辑商品，商品入库，商品出库操作</p>
        <Divider style={{marginTop: '10px', marginBottom: '30px'}} />
        <Form className="form-search" onSubmit={this.handleSubmit}>
          <Row gutter={24}>
            <Col span={4}>
              <FormItem label="id">
                {getFieldDecorator('goodId')(
                  <Input type="number" />
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                className="form-flex-wrapper"
                label="商品名称"
              >
                {getFieldDecorator('goodName', {
                  initialValue: ""
                })(
                  <Input type="text" />
                )}
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem label="分类:">
                {getFieldDecorator('categoryId', {
                  initialValue: 'all'
                })(
                  <CategorySelector
                    allItem
                  />
                )}
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem label="商品状态:">
                {getFieldDecorator('status', {
                  initialValue: 'all'
                })(
                  <Select
                    onChange={this.handleStatusChange}
                  >
                    <Option value="all">全部</Option>
                    <Option value="1">在售</Option>
                    <Option value="0">下架</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={5} style={{textAlign: 'right'}}>
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
