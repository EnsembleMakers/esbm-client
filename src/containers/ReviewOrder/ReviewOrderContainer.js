import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ReviewOrderWrapper } from '../../components/ReviewOrder/ReviewOrderWrapper';
import { ReviewOrderInstruction } from '../../components/ReviewOrder/ReviewOrderInstruction';
import { ReviewViewer } from '../../components/ReviewOrder/ReviewViewer';
import { ModelInfoFixedBar } from '../../components/ReviewSeriesId/ModelInfoFixedBar'
import * as reviewActions from '../../store/modules/review';

class ReviewOrderContainer extends Component {

  componentDidMount() {
    const { id } = this.props;
    const { ReviewActions } = this.props;
    ReviewActions.getReviewById(id)
  }

  render() {
    const { id } = this.props;
    const { reviewById } = this.props;
    return(
      <ReviewOrderWrapper
        instruction={<ReviewOrderInstruction 
            title={reviewById.get('title')}
            />}
        contents={<ReviewViewer 
            content={reviewById.get('content')}
            />}
        fixedBar={<ModelInfoFixedBar 
            buttonOn={true}
            />}
      />
    )
  }
}

export default connect(
  (state) => ({
    reviewById: state.review.get('reviewById')
  }),
  (dispatch) => ({
    ReviewActions: bindActionCreators(reviewActions, dispatch),
  })
)(ReviewOrderContainer)