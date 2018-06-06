import React from 'react';
import ReactEcharts from 'echarts-for-react';

export default class OrderCharts extends React.Component {
  getOption = () => {
    const {
      wait,
      success,
      refunding,
      dispatching
    } = this.props

    return {
      title : {
        text: '订单情况概要',
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['待发货', '交易成功', '退款中', '配送中']
      },
      series : [
        {
        name: '统计情况',
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        data:[
          {value: wait, name:'待发货'},
          {value: success, name:'交易成功'},
          {value: refunding, name:'退款中'},
          {value: dispatching, name:'配送中'},
        ],
        itemStyle: {
          emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
        }
      ]
    }
  }

  render() {

    return (
      <ReactEcharts
        option={this.getOption()}
        style={{
          height: 300,
          backgroundColor: '#fff',
          padding: '24px'
        }}
      />
    )
  }
}
