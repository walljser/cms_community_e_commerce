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
import AddAdminModal from './AddAdminModal';
import UpdateAdminModal from './UpdateAdminModal';
import DeleteAdminModal from './DeleteAdminModal';

@connect(
  state => ({
    adminId: state.auth.admin.adminId,
    token: state.auth.admin.token,
    admins: state.adminInfo.admins,
    isFetching: state.adminInfo.isFetching
  }),
  dispatch => ({
    fetchAdmins: (adminId, token) => dispatch(fetchAdminList(adminId, token))
  })
)
export default class Administrators extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    addModalVisible: false,
    updateModalVisible: false,
    updateValue: {},
    deleteModalVisible: false,
    deleteValue: {}
  }

  componentDidMount() {
    this.fetchAdmins()
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

  handleAddOpen = () => {
    this.setState({
      addModalVisible: true
    })
  }

  handleUpdateOpen = (record) => {
    this.setState({
      updateModalVisible: true,
      updateValue: record
    })
  }

  handleDeleteOpen = async (record) => {
    this.setState({
      deleteModalVisible: true,
      deleteValue: record
    })

    await this.fetchAdmins()
  }

  handleAddCancel = () => {
    this.setState({
      addModalVisible: false
    })
  }

  handleUpdateCancel = () => {
    this.setState({
      updateModalVisible: false
    })
  }

  handleDeleteCancel = () => {
    this.setState({
      deleteModalVisible: false
    })
  }

  handleAddSuccess = () => {
    this.setState({
      addModalVisible: false
    })
  }

  handleUpdateSuccess = () => {
    this.setState({
      updateModalVisible: false
    })
  }

  handleDeleteSuccess = () => {
    this.setState({
      deleteModalVisible: false
    })
  }

  render() {
    const {
      admins,
      isFetching
    } = this.props

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
      title: '是否为超级管理员',
      dataIndex: 'superLevel',
      key: 'superLevel',
      render: (text, record) => {
        if (record.superLevel === true) {
          return <span>是</span>
        } else {
          return <span>否</span>
        }
      }
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button
            type="primary"
            onClick={() => this.handleUpdateOpen(record)}
          >
            修改
          </Button>
          <Divider type="vertical" />
          <Button
            type="danger"
            onClick={() => this.handleDeleteOpen(record)}
          >
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
              onClick={this.handleAddOpen}
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
              loading={isFetching}
            />
          </Panel.Body>
          <AddAdminModal
            visible={this.state.addModalVisible}
            handleSubmit={this.handleAddSuccess}
            handleCancel={this.handleAddCancel}
          />
          <UpdateAdminModal
            visible={this.state.updateModalVisible}
            value={this.state.updateValue}
            handleSubmit={this.handleUpdateSuccess}
            handleCancel={this.handleUpdateCancel}
          />
          <DeleteAdminModal
            visible={this.state.deleteModalVisible}
            value={this.state.deleteValue}
            handleSubmit={this.handleDeleteSuccess}
            handleCancel={this.handleDeleteCancel}
          />
        </Panel>
      </Layout.Content>
    )
  }
}
