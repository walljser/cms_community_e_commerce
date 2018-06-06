import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  message,
  Modal,
  Form,
  Upload,
  Icon,
  Input
} from 'antd';
import {
  authError,
  fetchAllCategorySecond
} from '../../actions';
import categorySecondService from '../../services/categorySecondService';
import CategorySelector from '../../components/CategorySelector';

const FormItem = Form.Item

@connect(
  state => ({
    adminId: state.auth.admin.adminId,
    token: state.auth.admin.token
  }),
  dispatch => ({
    authError: (errorMessage) => authError(errorMessage),
    fetchCategories: () => dispatch(fetchAllCategorySecond())
  })
)
@Form.create()
export default class AddCategoryModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    authError: PropTypes.func.isRequired,
    fetchCategories: PropTypes.func.isRequired
  }

  state = {
    fileList: [],
    previewImage: '',
    previewVisible: false
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.props.form.validateFields((err, values) => {
      if (err) {
        return ;
      }

      this.postCategory(values.categoryFirstId, values.categoryName, values.image.fileList[0].originFileObj)
    })
  }

  handlePictureChange = ({ fileList }) => {
    this.setState({
      fileList
    })
  }

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  handleRemove = (file) => {
    this.setState({
      fileList: []
    })
  }

  handleCancel = () => {
    this.setState({
      previewVisible: false
    })
  }

  postCategory = async (categoryFirstId, categoryName, imageFile) => {
    const {
      adminId,
      token
    } = this.props

    try {
      const res = await categorySecondService.create(
        adminId,
        token,
        {
          categoryFirstId,
          categoryName,
          imageFile
        }
      )
      message.success('添加新分类成功')
      this.props.fetchCategories()
      this.props.handleSubmit()
    } catch (err) {
      if (err.message === undefined) {
        const errorMessage = '服务器出错啦，请耐心等待，麻烦很耐心的等待一年，谢谢'
        this.props.authError(errorMessage)
      }
      if (err.response.status === 401) {
        const errorMessage = '您的登录已过期，请重新登录'
        this.props.authError(errorMessage)
      }
      // 添加不成功
      if (err.response.status === 400) {
        const errorMessage = err.response.data.message
        message.error(errorMessage)
      }
    }
  }

  renderUploadBtn = () => {
    return (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
  }

  render() {
    const {
      visible,
      handleCancel,
      handleSubmit,
      form
    } = this.props

    const {
      fileList,
      previewImage,
      previewVisible
    } = this.state

    const { getFieldDecorator } = form

    console.log(fileList)

    return (
      <Modal
        visible={visible}
        title="新增分类"
        okText="保存"
        cancelText="取消"
        onCancel={handleCancel}
        onOk={this.handleSubmit}
      >
        <Form layout="vertical">
          <FormItem label="分类名称">
            {getFieldDecorator('categoryName', {
              rules: [{
                required: true,
                message: '请输入分类名称'
              }, {
                max: 10,
                min: 1,
                message: '商品名称不能超过10个字符'
              }]
            })(
              <Input type="text" />
            )}
          </FormItem>
          <FormItem label="所属一级分类">
            {
              getFieldDecorator('categoryFirstId', {
                rules: [{
                  required: true,
                  message: '请选择所属一级分类'
                }]
              })(
                <CategorySelector
                  allItem={false}
                  level="first"
                />
              )
            }
          </FormItem>
          <FormItem label="图片">
            {
              getFieldDecorator('image', {
                rules: [{
                  required: true,
                  message: '请上传图片'
                }]
              })(
                <Upload
                  action="http://yushijie.club:8080/cloudcommodity/api/v1/fileUpload"
                  listType="picture-card"
                  fileList={fileList}
                  onRemove={this.handleRemove}
                  onPreview={this.handlePreview}
                  onChange={this.handlePictureChange}
                >
                  {fileList.length >= 1 ? null : this.renderUploadBtn()}
                </Upload>
              )
            }
          </FormItem>
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </Form>
      </Modal>
    )
  }
}
