import React, { Component, Fragment } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

class PrivateRoute extends Component {
  render() {
    const { logged } = this.props;
    let { path, component } = this.props;
    // console.log(this.props.match);
    // console.log( path );
    if (logged!=null) {
      var result = logged ?
          <Route path={path} component={component}/> :
          <Redirect to={{pathname: '/login/signin'}}/>
      return result;
    } else {
      return <></>
    }
  }
}

export default PrivateRoute