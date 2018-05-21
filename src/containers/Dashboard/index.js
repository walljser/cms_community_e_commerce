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
    success: state.orders.success,
    successToday: state.orders.successToday,
    wait: state.orders.wait,
    waitToday: state.orders.waitToday,
    adminId: state.auth.admin.adminId,
    token: state.auth.admin.token
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
      success,
      successToday
    } = this.props
    console.log(this.props)

    return (
      <Layout.Content style={{backgroundColor: '#f0f2f5'}}>
         <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <MetaBox
              title="总销售额"
              icon={<Icon type="info-circle-o" />}
              info={'￥ ' + toThousands(36232.632)}
              desc="每日销售额： ￥ 1,682"
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
              info={toThousands(4920)}
              desc="今日新增： 83"
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
            <OrderCharts />
          </Col>
          <Col span={12}>
            <ConversionCharts />
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
