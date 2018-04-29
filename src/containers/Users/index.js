import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Panel from '../../components/Panel';
import UpdateUserModal from './UpdateUserModal';
import {
  Table,
  Button,
  Divider,
  Layout,
  Breadcrumb,
  Spin
} from 'antd';
import {
  fetchUsers
} from '../../actions';

@connect(
  state => ({
    adminId: state.auth.admin.adminId,
    token: state.auth.admin.token,
    isFetching: state.users.isFetching,
    users: state.users.users
  }),
  dispatch => ({
    fetchUsers: (adminId, token) => {
      dispatch(fetchUsers(adminId, token))
    }
  })
)
export default class Users extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    updateFormVisible: false,
    updateFormValue: {}
  }

  static propTypes = {
    adminId: PropTypes.number.isRequired,
    token: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    users: PropTypes.array.isRequired,
    fetchUsers: PropTypes.func.isRequired,
  }

  handleUpdateOpen = (value) => {
    this.setState({
      updateFormVisible: true,
      updateFormValue: value
    })
  }

  handleUpdateSuccess = () => {
    this.setState({
      updateFormVisible: false
    })
  }

  handleClose = () => {
    this.setState({
      updateFormVisible: false
    })
  }

  setUpdateFormRef = (form) =>{
    this.updateForm = form
  }

  componentDidMount() {
    this.props.fetchUsers(this.props.adminId, this.props.token)
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    })
  }

  render() {
    const {
      isFetching
    } = this.props

    let { users } = this.props
    let {
      filteredInfo,
      sortedInfo
    } = this.state

    filteredInfo = filteredInfo || {}
    sortedInfo = sortedInfo || {}

    const columns =[{
      title: 'id',
      dataIndex: 'userId',
      key: 'userId',
      sorter: (a, b) => a.userId - b.userId,
      sortOrder: sortedInfo.columnKey === 'userId' && sortedInfo.order
    }, {
      title: '账号',
      dataIndex: 'userName',
      key: 'userName'
    }, {
      title: '昵称',
      dataIndex: 'nickName',
      key: 'nickName'
    }, {
      title: '手机号码',
      dataIndex: 'phone',
      key: 'phone'
    }, {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      filters: [
        { text: '男', value: 'MAN' },
        { text: '女', value: 'WOMAN' }
      ],
      filteredValue: filteredInfo.sex || null,
      onFilter: (value, recored) => recored.sex === value
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="primary" onClick={() => this.handleUpdateOpen(record)}>
            修改信息
          </Button>
          <Divider type="vertical" />
          <Button type="danger">
            修改密码
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
              <Breadcrumb.Item>用户列表</Breadcrumb.Item>
            </Breadcrumb>
            <h2>用户列表</h2>
            <p>用户信息展示，可以进行修改用户个人信息，修改用户密码操作</p>
          </Panel.Header>
          <Panel.Body type="light">
            <Table
              rowKey={record => record.userId}
              dataSource={users}
              columns={columns}
              loading={isFetching}
              bordered
              onChange={this.handleChange}
            />
            <UpdateUserModal
              value={this.state.updateFormValue}
              ref={this.setUpdateFormRef}
              visible={this.state.updateFormVisible}
              handleSubmit={this.handleUpdateSuccess}
              handleCancel={this.handleClose}
            />
          </Panel.Body>
        </Panel>
      </Layout.Content>
    )
  }
}
