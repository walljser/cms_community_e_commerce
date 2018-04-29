import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchCategories
} from '../actions';
import {
  Select,
  Spin
} from 'antd';

const Option = Select.Option

@connect(
  state => ({
    isFetching: state.categories.isFetching,
    categories: state.categories.categories
  }),
  dispatch => ({
    getCategories: (adminId, token) => dispatch(fetchCategories(adminId, token))
  })
)
export default class CategorySelector extends React.Component {
  static defaultProps = {
    isFetching: PropTypes.bool.isRequired,
    categories: PropTypes.array.isRequired,
    getCategories: PropTypes.func.isRequired,
    allItem: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props)
    const value = this.props.value || ''
    this.state = {
      value
    }
  }

  componentDidMount() {
    this.props.getCategories()
  }

  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState({
        value
      });
    }
  }

  handleChange = (value) => {
    if (!('value' in this.props)) {
      this.setState(value);
    }
    this.triggerChange(value)
  }

  handleBlur = () => {
    console.log('blur');
  }

  handleFocus = () => {
    console.log('focus');
  }

  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue)
    }
  }

  render() {
    const {
      categories,
      isFetching,
      allItem
    } = this.props
    const value = this.state.value

    if (categories.length === 0) {
      return (
        <Spin>
          <Select defaultValue="1" style={{ width: 120 }} allowClear disabled>
            <Option value="1">正在获取数据</Option>
          </Select>
        </Spin>
      )
    } else {
      // const defaultValue = categories.length != 0 ? categories[0] : ""
      return (
        <Select
          showSearch
          style={{ width: 200 }}
          // placeholder="请选择一个分类"
          value={value}
          optionFilterProp="children"
          onChange={this.handleChange}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {
            allItem ? (
              <Option value="all">
                全部
              </Option>
            ) : ""
          }
          {
            categories.map(item => (
              <Option value={item.categoryId} key={item.categoryId}>
                {item.categoryName}
              </Option>
            ))
          }
        </Select>
      )
    }
  }
}
