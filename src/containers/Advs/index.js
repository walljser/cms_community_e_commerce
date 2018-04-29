import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@/components/Panel';
import {
  Button,
  Layout,
  Breadcrumb,
  Divider,
  Table,
  Form
} from 'antd';

const advs = [{
  id: 1000,
  name: '精品水果',
  image: 'http://119.29.161.228/cloudimg/advs/guoshushengxian.jpg'
}, {
  id: 1001,
  name: '中外名酒',
  image: 'http://119.29.161.228/cloudimg/advs/mingjiu.jpg'
}, {
  id: 1002,
  name: '天天海鲜',
  image: 'http://119.29.161.228/cloudimg/advs/longxia.jpg'
}]

export default class Adv extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    })
  }

  render() {
    let {
      filteredInfo,
      sortedInfo
    } = this.state

    filteredInfo = filteredInfo || {}
    sortedInfo = sortedInfo || {}

    const columns =[{
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id- b.id,
      sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order
    }, {
      title: '广告名称',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '图片',
      dataIndex: 'image',
      key: 'image',
      render: (text, record) => (
        <img className="advs-table-img" alt=".." src={text}/>
      )
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="primary">
            修改
          </Button>
          <Divider type="vertical" />
          <Button type="danger">
            删除
          </Button>
        </span>
      )
    }]

    return (
      <Layout.Content>
        <Panel minus>
          <Panel.Header type="light">
            <Breadcrumb>
              <Breadcrumb.Item>主页</Breadcrumb.Item>
              <Breadcrumb.Item>广告管理</Breadcrumb.Item>
            </Breadcrumb>
            <h2>广告管理</h2>
            <p>广告信息展示，可以进行新增广告，修改广告，删除广告操作。注意：最多只允许存在五个广告位。</p>
            <Divider style={{marginTop: '10px', marginBottom: '30px'}} />
            <Button
              type="primary"
              onClick={this.handleAddFormOpen}
            >
              新增广告
            </Button>
          </Panel.Header>
          <Panel.Body type="light">
            <Table
              rowKey={record => record.id}
              dataSource={advs}
              columns={columns}
              bordered
              onChange={this.handleChange}
            />
          </Panel.Body>
        </Panel>
      </Layout.Content>
    )
  }
}
