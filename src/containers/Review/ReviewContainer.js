import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ReviewEditor } from '../../components/Review/ReviewEditor';

class ReviewContainer extends Component {

  handlePost = () => {
    console.log('aa')
  }

  render() {
    const { handlePost } = this;
    return(
      <div>
        aa<br/>aa<br/>aa<br/>aa<br/>aa<br/>aa<br/>aa<br/>aa<br/>
        <ReviewEditor/>
        <div onClick={handlePost}>버튼</div>
      </div>
    )
  }
}

export default connect(
  (state) => ({

  }),
  (dispatch) => ({

  })
)(ReviewContainer);
