import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Panel from '@/components/Panel';
import {
  Button,
  Layout,
  Breadcrumb,
  Divider,
  Table,
  Form
} from 'antd';
import AddAdvModal from './AddAdvModal';
import UpdateAdvModal from './UpdateAdvModal';
import DeleteAdvModal from './DeleteAdvModal';
import {
  getAllAdvs
} from '../../actions';

@connect(
  state => ({
    advs: state.advs.advs,
    isFetching: state.advs.isFetching
  }),
  dispatch => ({
    fetchAdvs: () => dispatch(getAllAdvs())
  })
)
export default class Adv extends React.Component {
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
    this.props.fetchAdvs()
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    })
  }

  handleOpenAddModal = () => {
    this.setState({
      addModalVisible: true
    })
  }

  handleAddModalClose = () => {
    this.setState({
      addModalVisible: false
    })
  }

  handleAddSuccess = () => {
    this.setState({
      addModalVisible: false
    })
  }

  handleOpenUpdateModal = (value) => {
    this.setState({
      updateModalVisible: true,
      updateValue: value
    })
  }

  handleUpdateCancel = () => {
    this.setState({
      updateModalVisible: false
    })
  }

  handleUpdateSuccess = () => {
    this.setState({
      updateModalVisible: false
    })
  }

  handleDeleteModalOpen = (record) => {
    this.setState({
      deleteModalVisible: true,
      deleteValue: record
    })
  }

  handleDeleteSuccess = () => {
    this.setState({
      deleteModalVisible: false
    })
  }

  handleDeleteCancel = () => {
    this.setState({
      deleteModalVisible: false
    })
  }

  render() {
    const {
      advs,
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
      dataIndex: 'advSwiperId',
      key: 'advSwiperId',
      sorter: (a, b) => a.advSwiperId - b.advSwiperId,
      sortOrder: sortedInfo.columnKey === 'advSwiperId' && sortedInfo.order
    }, {
      title: '广告名称',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '所属分类',
      dataIndex: 'categoryName',
      key: 'categoryName'
    }, {
      title: '图片',
      dataIndex: 'image',
      key: 'image',
      render: (text, record) => (
        <img className="advs-table-img" alt=".." src={text} />
      )
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button
            type="primary"
            onClick={() => this.handleOpenUpdateModal(record)}
          >
            修改
          </Button>
          <Divider type="vertical" />
          <Button
            type="danger"
            onClick={() => this.handleDeleteModalOpen(record)}
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
              <Breadcrumb.Item>广告管理</Breadcrumb.Item>
            </Breadcrumb>
            <h2>广告管理</h2>
            <p>广告信息展示，可以进行新增广告，修改广告，删除广告操作。注意：最多只允许存在五个广告位。</p>
            <Divider style={{marginTop: '10px', marginBottom: '30px'}} />
            <Button
              type="primary"
              onClick={this.handleOpenAddModal}
            >
              新增广告
            </Button>
          </Panel.Header>
          <Panel.Body type="light">
            <Table
              rowKey={record => record.advSwiperId}
              dataSource={advs}
              columns={columns}
              bordered
              onChange={this.handleChange}
              loading={isFetching}
            />
          </Panel.Body>
          <AddAdvModal
            visible={this.state.addModalVisible}
            handleSubmit={this.handleAddSuccess}
            handleCancel={this.handleAddModalClose}
          />
          <UpdateAdvModal
            visible={this.state.updateModalVisible}
            value={this.state.updateValue}
            handleSubmit={this.handleUpdateSuccess}
            handleCancel={this.handleUpdateCancel}
          />
          <DeleteAdvModal
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
