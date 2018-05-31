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
  getAllAdvs
} from '../../actions';
import advService from '../../services/advService';
import CategorySelector from '../../components/CategorySelector';

const FormItem = Form.Item

@connect(
  state => ({
    adminId: state.auth.admin.adminId,
    token: state.auth.admin.token
  }),
  dispatch => ({
    authError: (errorMessage) => authError(errorMessage),
    fetchAdvs: () => dispatch(getAllAdvs())
  })
)
@Form.create()
export default class AddAdvModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    authError: PropTypes.func.isRequired,
    fetchAdvs: PropTypes.func.isRequired
  }

  state = {
    fileList: [],
    previewImage: '',
    previewVisible: false
  }

  componentDidMount() {
    this.props.form.resetFields()
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.props.form.validateFields((err, values) => {
      if (err) {
        return ;
      }

      this.postCategory(values.name, values.categorySecondId, values.image.fileList[0].originFileObj)
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

  postCategory = async (name, categorySecondId, image) => {
    const {
      adminId,
      token
    } = this.props

    try {
      const res = await advService.create(
        adminId,
        token,
        {
          name,
          categorySecondId,
          image
        }
      )
      message.success('添加新广告成功')
      this.props.fetchAdvs()
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
        title="新增广告"
        okText="保存"
        cancelText="取消"
        onCancel={handleCancel}
        onOk={this.handleSubmit}
      >
        <Form layout="vertical">
          <FormItem label="名称">
            {getFieldDecorator('name', {
              rules: [{
                required: true,
                message: '请输入广告名称'
              }, {
                max: 10,
                min: 1,
                message: '广告名称不能超过10个字符'
              }]
            })(
              <Input type="text" />
            )}
          </FormItem>
          <FormItem label="所属二级分类">
            {
              getFieldDecorator('categorySecondId', {
                rules: [{
                  required: true,
                  message: '请选择所属二级分类'
                }]
              })(
                <CategorySelector
                  allItem={false}
                  level="second"
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
