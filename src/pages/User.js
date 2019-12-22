import React, { Component } from 'react';
import { UserSummaryContainer } from '../containers/User';
import { Route, Switch } from 'react-router-dom';

class User extends Component {
  render() {
    const { url } = this.props.match;
    return(
      <>
        <Route exact path={url} component={UserSummaryContainer}/>
        <Route path={`${url}/:page`} component={UserSummaryContainer}/>
      </>
    )
  }
}

export default User;