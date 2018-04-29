import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCategories } from '../../actions';
import Panel from '../../components/Panel';
import AddCategoryModal from './AddCategoryModal';
import UpdateCategoryModal from './UpdateCategoryModal';
import DeleteCategoryModal from './DeleteCategoryModal';
import {
  Button,
  Divider,
  Layout,
  Breadcrumb,
  Table
} from 'antd';

@connect(
  state => ({
    adminId: state.auth.admin.adminId,
    token: state.auth.admin.token,
    categories: state.categories.categories,
    isFetching: state.categories.isFetching
  }),
  dispatch => ({
    getCategories: () => dispatch(fetchCategories())
  })
)
export default class CategoryFirst extends React.Component {
  static propTypes = {
    adminId: PropTypes.number.isRequired,
    token: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired
  }

  state = {
    addFormVisible: false,
    updateFormVisible: false,
    deleteModalVisible: false,
    deleteCategoryValue: {},
    updateFormValue: {}
  }

  componentDidMount() {
    this.props.getCategories()
  }

  handleUpdateSuccess = () => {
    this.setState({
      updateFormVisible: false
    })
  }

  handleAddSuccess = () => {
    this.setState({
      addFormVisible: false
    })
  }

  handelDeleteSuccess = () => {
    this.setState({
      deleteModalVisible: false
    })
  }

  handleAddFormOpen = () => {
    this.setState({
      addFormVisible: true
    })
  }

  handleUpdateOpen = (value) => {
    this.setState({
      updateFormVisible: true,
      updateFormValue: value
    })
  }

  handleDeleteOpen = (value) => {
    this.setState({
      deleteModalVisible: true,
      deleteCategoryValue: value
    })
  }

  handleClose = () => {
    this.setState({
      addFormVisible: false,
      updateFormVisible: false,
      deleteModalVisible: false
    })
  }

  setAddFormRef = (form) =>{
    this.addForm = form
  }

  setUpdateFormRef = (form) =>{
    this.updateForm = form
  }

  render() {
    const {
      isFetching,
      categories
    } = this.props

    const columns = [{
      title: 'id',
      dataIndex: 'categoryId',
      key: 'categoryId'
    }, {
      title: '分类名称',
      dataIndex: 'categoryName',
      key: 'categoryName'
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span style={{width: '200px'}}>
          <Button
            type="primary"
            onClick={() => this.handleUpdateOpen(record)}
          >
            修改
          </Button>
          <Divider type="vertical"/>
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
              <Breadcrumb.Item>一级商品分类</Breadcrumb.Item>
            </Breadcrumb>
            <h2>一级商品分类</h2>
            <p>一级商品分类展示，可以进行新增商品分类，修改商品分类，删除商品分类操作</p>
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
              rowKey={record => record.categoryId}
              dataSource={categories}
              columns={columns}
              loading={isFetching}
              bordered
            />
            <AddCategoryModal
              ref={this.setAddFormRef}
              visible={this.state.addFormVisible}
              handleSubmit={this.handleAddSuccess}
              handleCancel={this.handleClose}
            />
            <UpdateCategoryModal
              value={this.state.updateFormValue}
              ref={this.setUpdateFormRef}
              visible={this.state.updateFormVisible}
              handleSubmit={this.handleUpdateSuccess}
              handleCancel={this.handleClose}
            />
            <DeleteCategoryModal
              value={this.state.deleteCategoryValue}
              visible={this.state.deleteModalVisible}
              handleSubmit={this.handelDeleteSuccess}
              handleCancel={this.handleClose}
            />
          </Panel.Body>
        </Panel>
      </Layout.Content>
    )
  }
}
