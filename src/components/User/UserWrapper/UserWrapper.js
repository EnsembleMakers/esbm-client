import React, { Component } from 'react';
import './UserWrapper.scss';

class UserWrapper extends Component {
  render() {
    const { children } = this.props;
    return(
      <div className="user-wrapper">
        <div className="user-header">프로필 설정</div>
        {children}
      </div>
    )
  }
}

export default UserWrapper;