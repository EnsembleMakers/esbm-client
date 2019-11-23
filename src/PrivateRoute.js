import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'

class PrivateRoute extends Component {
  render() {
    const { logged } = this.props;
    let { path, component } = this.props;
    return(
      logged!=null && <Route path={path} render={props =>
        logged?component:<Redirect to={{pathname: '/login/signin'}}/>
      }/>
    )
  }
}

export default PrivateRoute