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
  id: 10000000,
  categoryName: '精品水果',
  categorySecondName: '应季热销',
  image: 'http://119.29.161.228/cloudimg/categories/yingjirexiao.png'
}, {
  id: 10000001,
  categoryName: '精品水果',
  categorySecondName: '瓜类',
  image: 'http://119.29.161.228/cloudimg/categories/gualei.png'
}, {
  id: 10000002,
  categoryName: '精品水果',
  categorySecondName: '苹果梨',
  image: 'http://119.29.161.228/cloudimg/categories/pingguoli.png'
}, {
  id: 10000003,
  categoryName: '精品水果',
  categorySecondName: '小果类',
  image: 'http://119.29.161.228/cloudimg/categories/xiaoguolei.png'
}, {
  id: 10000004,
  categoryName: '优选蔬菜',
  categorySecondName: '豆类',
  image: 'http://119.29.161.228/cloudimg/categories/doulei.png'
}, {
  id: 10000005,
  categoryName: '优选蔬菜',
  categorySecondName: '调味类',
  image: 'http://119.29.161.228/cloudimg/categories/tiaoweilei.png'
}, {
  id: 10000006,
  categoryName: '优选蔬菜',
  categorySecondName: '叶菜类',
  image: 'http://119.29.161.228/cloudimg/categories/yecailei.png'
}, {
  id: 10000007,
  categoryName: '禽鱼肉类',
  categorySecondName: '鸡鸭禽肉',
  image: 'http://119.29.161.228/cloudimg/categories/jiyaqinrou.png'
}, {
  id: 10000008,
  categoryName: '禽鱼肉类',
  categorySecondName: '牛肉牛排',
  image: 'http://119.29.161.228/cloudimg/categories/niurouniupai.png'
}, {
  id: 10000009,
  categoryName: '禽鱼肉类',
  categorySecondName: '软体类',
  image: 'http://119.29.161.228/cloudimg/categories/ruantilei.png'
}, {
  id: 10000010,
  categoryName: '禽鱼肉类',
  categorySecondName: '虾类',
  image: 'http://119.29.161.228/cloudimg/categories/xialei.png'
}, {
  id: 10000011,
  categoryName: '禽鱼肉类',
  categorySecondName: '蟹类贝类',
  image: 'http://119.29.161.228/cloudimg/categories/xieleibeilei.png'
}, {
  id: 10000012,
  categoryName: '禽鱼肉类',
  categorySecondName: '鱼类',
  image: 'http://119.29.161.228/cloudimg/categories/yulei.png'
}, {
  id: 10000013,
  categoryName: '禽鱼肉类',
  categorySecondName: '猪肉类',
  image: 'http://119.29.161.228/cloudimg/categories/zhuroulei.png'
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
      title: '所属一级名称',
      dataIndex: 'categoryName',
      key: 'categoryName'
    }, {
      title: '分类名称',
      dataIndex: 'categorySecondName',
      key: 'categorySecondName'
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
              <Breadcrumb.Item>二级商品分类</Breadcrumb.Item>
            </Breadcrumb>
            <h2>二级商品分类</h2>
            <p>二级商品分类展示，可以进行新增分类，修改分类，删除分类操作。</p>
            <Divider style={{marginTop: '10px', marginBottom: '30px'}} />
            <Button
              type="primary"
              onClick={this.handleAddFormOpen}
            >
              新增分类
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
