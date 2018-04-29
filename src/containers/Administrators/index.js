import React from 'react';
import { connect } from 'react-redux';
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
import { fetchAdminList } from '@/actions/index';

const admins = [
  {
    administratorId: 100,
    userName: 'admin',
    passWord: 'admin',
    nickName: '超级管理员',
    superLevel: true,
    phone: 17704623923
  },
  {
    administratorId: 101,
    userName: 'jinyang',
    passWord: 'jinyang333',
    nickName: '金阳管理员',
    superLevel: false,
    phone: 17704623923
  },
  {
    administratorId: 102,
    userName: 'furong',
    passWord: 'furaondj',
    nickName: '福荣仓库管理员',
    superLevel: false,
    phone: 15729831723
  },
  {
    administratorId: 103,
    userName: 'jintong',
    passWord: 'jintong66',
    nickName: '金桐仓库管理员',
    superLevel: false,
    phone: 17432313728
  }
]

@connect(
  state => ({
    adminId: state.auth.admin.adminId,
    token: state.auth.admin.token,
    admins: state.adminInfo.admins
  }),
  dispatch => ({
    fetchAdmins: (adminId, token) => dispatch(fetchAdminList(adminId, token))
  })
)
export default class Administrators extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null
  }

  fetchAdmins = async () => {
    const {
      adminId,
      token,
      fetchAdmins
    } = this.props

    await fetchAdmins(adminId, token)
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
      dataIndex: 'administratorId',
      key: 'administratorId',
      sorter: (a, b) => a.administratorId- b.administratorId,
      sortOrder: sortedInfo.columnKey === 'administratorId' && sortedInfo.order
    }, {
      title: '账号',
      dataIndex: 'userName',
      key: 'userName'
    }, {
      title: '密码',
      dataIndex: 'passWord',
      key: 'passWord'
    }, {
      title: '昵称',
      dataIndex: 'nickName',
      key: 'nickName',
    }, {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
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
              <Breadcrumb.Item>管理员信息</Breadcrumb.Item>
            </Breadcrumb>
            <h2>管理员信息</h2>
            <p>管理员信息，可以进行新增管理员、修改管理员信息、删除管理员。</p>
            <Divider style={{marginTop: '10px', marginBottom: '30px'}} />
            <Button
              type="primary"
              onClick={this.handleAddFormOpen}
            >
              新增管理员
            </Button>
          </Panel.Header>
          <Panel.Body type="light">
            <Table
              rowKey={record => record.administratorId}
              dataSource={admins}
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
