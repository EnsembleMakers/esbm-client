import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ReviewEditor } from '../../components/Review/ReviewEditor';

class ReviewContainer extends Component {
  render() {
    return(
      <div>
        aa<br/>aa<br/>aa<br/>aa<br/>aa<br/>aa<br/>aa<br/>aa<br/>
        <ReviewEditor/>
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
