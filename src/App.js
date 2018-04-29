import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import classNames from 'classnames';

class App extends React.Component {
  static defaultProps = {
    prefix: 'yu'
  }

  render() {
    const {
      prefix
    } = this.props

    const classes = classNames(
      `${prefix}-app`
    )

    return (
      <div>
      </div>
    );
  }
}

export default App;

