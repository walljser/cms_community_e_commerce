import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {
  Col,
  Card,
  Button,
  Icon
} from 'antd';

export default class GoodCard extends React.Component {
  static propTypes = {
    good: PropTypes.object,
    handleEdit: PropTypes.func.isRequired,
    handleIncrease: PropTypes.func.isRequired,
    handleDecrease: PropTypes.func.isRequired,
  }

  handleEdit = () => {
    this.props.handleEdit(this.props.good)
  }

  handleIncrease = () => {
    this.props.handleIncrease(this.props.good)
  }

  handleDecrease = () => {
    this.props.handleDecrease(this.props.good)
  }

  render() {
    const {
      good
    } = this.props

    const inventoryClasses = classNames(
      `good-card-item-block`,
      {
        [`warning-color`]: good.inventory === 0
      }
    )

    return (
      <Col span={8} style={{padding: "8px"}}>
        <Card
          className="good-card"
          cover={
            <div
              className="good-card-img"
            >
              <img
                src={good.image}
                alt="商品图片"
              />
            </div>
          }
          hoverable
          actions={
            [
              <Icon
                style={{width: "100%", height: "100%"}}
                type="edit"
                onClick={this.handleEdit}
              />,
              <Icon
                style={{width: "100%", height: "100%"}}
                type="plus"
                onClick={this.handleIncrease}
              />,
              <Icon
                style={{width: "100%", height: "100%"}}
                type="minus"
                onClick={this.handleDecrease}
              />]
          }
        >
          <h4 className="good-card-header">{good.goodName}</h4>
          <ul className="good-card-content-list">
            <li className="good-card-content-item">
              <div className="good-card-item-block">
                <p className="good-card-item-title">商品id</p>
                <p>{good.goodId} </p>
              </div>
              <div className="good-card-item-block">
                <p className="good-card-item-title">分类</p>
                <p>{good.category.categoryName} </p>
              </div>
            </li>
            <li className="good-card-content-item">
              <div className="good-card-item-block active-color" style={{fontWeight: '600'}}>
                <p className="good-card-item-title">现价</p>
                <p>{good.price} 元</p>
              </div>
              <div className="good-card-item-block">
                <p className="good-card-item-title">原价</p>
                <p>{good.originalPrice} 元</p>
              </div>
            </li>
            <li className="good-card-content-item">
              <div className={inventoryClasses}>
                <p className="good-card-item-title">库存</p>
                <p>{good.inventory} 件</p>
              </div>
              <div className="good-card-item-block">
                <p className="good-card-item-title">销量</p>
                <p>{good.soldCount} 件</p>
              </div>
            </li>
            <li className="good-card-content-item">
              <div className="good-card-item-block">
                <p className="good-card-item-title">规格</p>
                <p>{good.spec} </p>
              </div>
              <div className="good-card-item-block">
                <p className="good-card-item-title">原产地</p>
                <p>{good.origin} </p>
              </div>
            </li>
          </ul>
        </Card>
      </Col>
    )
  }
}
