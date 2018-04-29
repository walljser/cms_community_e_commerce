import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchGoods
} from '@/actions/index';
import Panel from '@/components/Panel';
import GoodCard from '@/components/GoodCard';
import {
  Row,
  Col,
  Icon,
  Layout,
  Button,
  Pagination
} from 'antd';
import UpdateGoodModal from './UpdateGoodModal';
import AddGoodModal from './AddGoodModal';
import BePutInStorage from './BePutInStorage';
import DecreaseInventory from './DecreaseInventory';
import SelectorHeader from './SelectorHeader';

const { Body } = Panel;

@connect(
  state => ({
    adminId: state.auth.admin.adminId,
    token: state.auth.admin.token,
    isFetching: state.goods.isFetching,
    goods: state.goods.goods,
    total: state.goods.total,
    pageNum: state.goods.pageNum
  }),
  dispatch => ({
    fetchGoods: (adminId, token, good, pageNum) => dispatch(fetchGoods(adminId, token, good, pageNum))
  })
)
export default class Goods extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    addFormVisible: false,
    updateFormVisible: false,
    putInFormVisible: false,
    decreaseFormVisible: false,
    currentGood: null,
    searchGood: null,
    currentPage: 1
  }

  static propTypes = {
    adminId: PropTypes.number.isRequired,
    token: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    goods: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired,
    pageNum: PropTypes.number.isRequired,
    fetchGoods: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const {
      adminId,
      token,
      pageNum
    } = this.props
    const { searchGood } = this.state

    // fetch good information
    this.props.fetchGoods(adminId, token, searchGood, pageNum)
  }

  handleSelectorChange = (values) => {
    this.setState({
      searchGood: values
    })

    const {
      adminId,
      token,
      pageNum
    } = this.props

    // fetch good information
    this.props.fetchGoods(adminId, token, values, pageNum)
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    })
  }

  handlePageChange = (pageNum) => {
    const {
      adminId,
      token,
      goods
    } = this.props

    this.props.fetchGoods(adminId, token,goods, pageNum)
  }

  handleAddModalShow = () => {
    this.setState({
      addFormVisible: true
    })
  }

  handleUpdateModalShow = (good) => {
    this.setState({
      currentGood: good,
      updateFormVisible: true
    })
  }

  handlePutInShow = (good) => {
    this.setState({
      putInFormVisible: true,
      currentGood: good
    })
  }

  handleDecreaseShow = (good) => {
    this.setState({
      decreaseFormVisible: true,
      currentGood: good
    })
  }

  handleCancel = () => {
    this.setState({
      addFormVisible: false,
      updateFormVisible: false,
      putInFormVisible: false,
      decreaseFormVisible: false
    })
  }

  handleCreateSuccess = () => {
    this.setState({
      addFormVisible: false
    })

    this.fetchGoods()
  }

  handleUpateSuccess = () => {
    this.setState({
      updateFormVisible: false
    })

    this.fetchGoods()
  }

  handleUpInSuccess = () => {
    this.setState({
      putInFormVisible: false
    })

    this.fetchGoods()
  }

  handleDecreaseSuccess = () => {
    this.setState({
      decreaseFormVisible: false
    })

    this.fetchGoods()
  }

  fetchGoods = () => {
    const {
      adminId,
      token,
      pageNum
    } = this.props
    const { searchGood } = this.state
    this.props.fetchGoods(adminId, token, searchGood, pageNum)
  }

  renderGood = () => {
    const goods = this.props.goods ? this.props.goods : []
    const processedGoods = []
    const goodList = []

    // 处理商品列表数据，数组首个为null，放button用
    for (let i = 0, len = goods.length; i < len;) {
      if (i === 0) {
        processedGoods.push([null, ...goods.slice(0, 2)])
        i += 2
        continue
      }

      processedGoods.push(goods.slice(i, i + 3))
      i += 3
    }

    processedGoods.map((row, rowId) => {
      const rows = []
      row.map((item, itemId) => {
        if (null !== item) {
          rows.push(
            <GoodCard
              good={item}
              key={itemId}
              handleEdit={this.handleUpdateModalShow}
              handleIncrease={this.handlePutInShow}
              handleDecrease={this.handleDecreaseShow}
            />
          )
        } else {
          rows.push(
            <Col
              span={8}
              key={itemId}
              style={{padding: '8px'}}
            >
              <Button
                className="good-card-add"
                onClick={this.handleAddModalShow}
              >
                <span>
                  <Icon type="plus" /> 添加商品
                </span>
              </Button>
            </Col>
          )
        }
      })

      goodList.push(
        <Row gutter={16} key={rowId}>
          {rows}
        </Row>
      )
    })

    if (goodList.length > 0) {
      return goodList
    } else {
      goodList.push(
        <Row gutter={16} key={1}>
          <Col
            span={8}
            key={2}
            style={{padding: '8px'}}
          >
            <Button
              className="good-card-add"
              onClick={this.handleAddModalShow}
            >
              <span>
                <Icon type="plus" /> 添加商品
              </span>
            </Button>
          </Col>
        </Row>
      )
      return goodList
    }
  }

  render() {
    let goodList = this.renderGood()
    goodList = goodList ? goodList : []

    return (
      <Layout.Content
        style={{
          backgroundColor: "transparent"
        }}
      >
        <Panel minus>
          <SelectorHeader
            handleSelectorChange={this.handleSelectorChange}
          />
          <Panel.Body>
            {
              goodList.length > 0 ? (
                goodList.map((item) => {
                  return item
                })
              ) : ""
            }
            <AddGoodModal
              visible={this.state.addFormVisible}
              isUploading={this.props.isUploading}
              handleCancel={this.handleCancel}
              handleSubmit={this.handleCreateSuccess}
            />
            <UpdateGoodModal
              visible={this.state.updateFormVisible}
              updateForm={this.state.currentGood}
              handleSubmit={this.handleUpateSuccess}
              handleCancel={this.handleCancel}
            />
            <BePutInStorage
              visible={this.state.putInFormVisible}
              good={this.state.currentGood}
              handleSubmit={this.handleUpInSuccess}
              handleCancel={this.handleCancel}
            />
            <DecreaseInventory
              visible={this.state.decreaseFormVisible}
              good={this.state.currentGood}
              handleSubmit={this.handleDecreaseSuccess}
              handleCancel={this.handleCancel}
            />
            <Pagination
              defaultCurrent={this.state.currentPage}
              total={this.props.total}
              defaultPageSize={8}
              onChange={this.handlePageChange}
              style={{
                textAlign: 'center',
                marginTop: '30px'
              }}
            />
          </Panel.Body>
        </Panel>
      </Layout.Content>
    );
  }
}
