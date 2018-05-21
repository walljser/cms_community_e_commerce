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
import {
  getAllOrders
} from '@/actions/index';
import { dateFormat } from '@/utils/index';
import SelectorHeader from './SelectorHeader';
import StatusFilter from './StatusFilter';
import DetailItem from './DetailItem';

@connect(
  state => ({
    adminId: state.auth.admin.adminId,
    token: state.auth.admin.token,
    orders: state.orders.orders,
    isFetching: state.orders.isFetchingOrders
  }),
  dispatch => ({
    loadOrders: (adminId, token, params) => {
      dispatch(getAllOrders(adminId, token, params))
    }
  })
)
export default class Orders extends React.Component {
  static propTypes = {
    adminId: PropTypes.number.isRequired,
    token: PropTypes.string.isRequired,
    orders: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    loadOrders: PropTypes.func.isRequired
  }

  state = {
    filteredInfo: null,
    sortedInfo: null
  }

  componentDidMount() {
    this.loadOrders()
  }

  loadOrders = async (params) => {
    const {
      adminId,
      token
    } = this.props

    await this.props.loadOrders(adminId, token, params)
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    })
  }

  onSelectorChange = (value) => {
    const status = typeof value.status !== 'undefined' && value.status !== 'all' ? value.status : null
    const start = value.createTime ? value.createTime[0].format('YYYY-MM-DD') : null
    const end = value.createTime ? value.createTime[1].format('YYYY-MM-DD') : null
    const userName = value.userName && value.userName !== '' ? value.userName : null
    const orderId = value.orderId ? parseInt(value.orderId) : null

    const params = {
      status,
      start,
      end,
      userName,
      orderId
    }

    this.loadOrders(params)
  }

  renderExpanded = (record) => {
    const address = record.address.city + record.address.address + record.address.streetNumber
    const addressContent = address + `   ${record.address.consignee}   ${record.address.phone}`
    return (
      <div>
        <p>
          用户收货地址： {addressContent}
        </p>
        <h4>商品：</h4>
        {
          record.orderDetails.length > 0 ? (
            record.orderDetails.map((item) => {
              return (
                <DetailItem
                  key={item.goodId}
                  detail={item}
                />
              )
            })
          ) : null
        }
      </div>
    )
  }

  render() {
    const {
      isFetching
    } = this.props

    let orders = this.props.orders
    let {
      filteredInfo,
      sortedInfo
    } = this.state

    filteredInfo = filteredInfo || {}
    sortedInfo = sortedInfo || {}

    const columns =[{
      title: 'id',
      dataIndex: 'orderId',
      key: 'orderId',
      sorter: (a, b) => a.orderId - b.orderId,
      sortOrder: sortedInfo.columnKey === 'orderId' && sortedInfo.order
    }, {
      title: '用户id',
      dataIndex: 'userId',
      key: 'userId'
    }, {
      title: '总价',
      dataIndex: 'amount',
      key: 'amount'
    }, {
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        return (
          <StatusFilter
            status={text}
          />
        )
      },
      filters: [
        { text: '未发货', value: '0' },
        { text: '配送中', value: '1' },
        { text: '已完成', value: '2' },
        { text: '退款中', value: '3' },
        { text: '退款成功', value: '-1'},
        { text: '退款失败', value: '-2'},
      ],
      filteredValue: filteredInfo.status || null,
      onFilter: (value, recored) => {
        return recored.status === parseInt(value, 10)
      }
    }, {
      title: '下单时间',
      dataIndex: 'createTime',
      render: (text, record) => {
        return (
          <span>
            {
              dateFormat(new Date(text), 'yyyy-MM-dd hh:ss')
            }
          </span>
        )
      }
      // key: 'createTime',
    }, {
      title: '备注',
      dataIndex: 'remarks',
      key: 'remarks'
    }]

    return (
      <Layout.Content>
        <Panel minus>
          <SelectorHeader
            handleSelectorChange={this.onSelectorChange}
          />
          <Panel.Body type="light">
            <Table
              rowKey={record => record.orderId}
              dataSource={orders}
              expandedRowRender={this.renderExpanded}
              columns={columns}
              loading={isFetching}
              bordered
              onChange={this.handleTableChange}
            />
          </Panel.Body>
        </Panel>
      </Layout.Content>
    )
  }
}
