import React from 'react';
import ReactEcharts from 'echarts-for-react';

export default class ConversionCharts extends React.Component {
  getOption = () => {
    const {
      collection,
      success
    } = this.props

    return {
      title : {
        text: '客户收藏转化率',
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['收藏购物车','已完成订单']
      },
      series : [
        {
        name: '统计情况',
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        data:[
          {value: collection, name:'收藏购物车'},
          {value: success, name:'已完成订单'},
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
