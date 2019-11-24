import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UserWrapper } from '../../components/User/UserWrapper';

class UserSummaryContainer extends Component {
  render() {
    return(
      <UserWrapper>
        <div>안녕하세요</div>
      </UserWrapper>
    )
  }
}

export default connect(
  (state) => ({
    
  }),
  (dispatch) => ({
    
  })
)(UserSummaryContainer)