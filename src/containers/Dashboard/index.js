import React from 'react';
import { connect } from 'react-redux';
import {
  Layout,
  Tabs,
  Row,
  Col,
  Icon,
  Tooltip,
  Card
} from 'antd';
import MetaBox from '@/components/MetaBox';
import Panel from '@/components/Panel';
import OrderCharts from './OrderCharts';
import ConversionCharts from './ConversionCharts';
import {
  statisticsOrder
} from '../../actions';

@connect(
  state => ({
    success: state.orders.success, // 成交订单
    successToday: state.orders.successToday, // 今日成交
    wait: state.orders.wait,  // 待发货
    waitToday: state.orders.waitToday, // 今日新增待发货
    totalSale: state.orders.totalSale, // 共销售
    todaySale: state.orders.todaySale, // 今日销售额
    userCount: state.orders.userCount, // 用户数量
    refunding: state.orders.refunding, // 退款中
    dispatching: state.orders.dispatching, // 配送中
    collection: state.orders.collection, // 收藏数量
    adminId: state.auth.admin.adminId, // 管理员id
    token: state.auth.admin.token, // token
  }),
  dispatch => ({
    fetchOrderStatus: (adminId, token) => dispatch(statisticsOrder(adminId, token))
  })
)
export default class Dashboard extends React.Component {
  componentDidMount() {
    this.fetchOrderStatus()
  }

  fetchOrderStatus = async () => {
    const {
      adminId,
      token
    } = this.props

    await this.props.fetchOrderStatus(adminId, token)
  }

  render() {
    const {
      wait,
      waitToday,
      refunding,
      dispatching,
      success,
      successToday,
      totalSale,
      todaySale,
      collection,
      userCount
    } = this.props

    return (
      <Layout.Content style={{backgroundColor: '#f0f2f5'}}>
         <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <MetaBox
              title="总销售额"
              icon={<Icon type="info-circle-o" />}
              info={'￥ ' + toThousands(totalSale)}
              desc={"今日销售额： ￥ " + toThousands(todaySale)}
            >
            </MetaBox>
          </Col>
          <Col className="gutter-row" span={6}>
            <MetaBox
              title="待发货"
              info={wait}
              desc={"今日新增： " + waitToday}
            >
            </MetaBox>
          </Col>
          <Col className="gutter-row" span={6}>
            <MetaBox
              title="购物车收藏数"
              info={toThousands(collection)}
              desc={"用户数量： " + userCount}
            >
            </MetaBox>
          </Col>
          <Col className="gutter-row" span={6}>
            <MetaBox
              title="成交笔数"
              info={success}
              desc={"今日新增： " + successToday}
            >
            </MetaBox>
          </Col>
        </Row>
        {/* <Panel style={{marginTop: '30px'}}>
          <Panel.Body type="light">
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="订单概要" key="1">
                <OrderCharts />
              </Tabs.TabPane>
              <Tabs.TabPane tab="收藏转化率" key="2">
                <ConversionCharts />
              </Tabs.TabPane>
            </Tabs>
          </Panel.Body>
        </Panel> */}
        <Row gutter={24} style={{marginTop: '30px'}}>
          <Col span={12} style={{bakcground: '#fff'}}>
            <OrderCharts
              wait={wait}
              success={success}
              refunding={refunding}
              dispatching={dispatching}
            />
          </Col>
          <Col span={12}>
            <ConversionCharts collection={collection} success={success} />
          </Col>
        </Row>
      </Layout.Content>
    )
  }
}

function toThousands (str) {
  if (!str) {
    return ''
  }

  return str.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
}
