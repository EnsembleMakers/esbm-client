import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import { ReviewOrderWrapper } from '../../components/ReviewOrder/ReviewOrderWrapper';
import { ReviewOrderInstruction } from '../../components/ReviewOrder/ReviewOrderInstruction';
import { ReviewViewer } from '../../components/ReviewOrder/ReviewViewer';
import { ModelInfoFixedBar } from '../../components/ReviewSeriesId/ModelInfoFixedBar'

import * as reviewActions from '../../store/modules/review';
import * as modalActions from '../../store/modules/modal';

class ReviewOrderContainer extends Component {

  async componentDidMount() {
    const { id } = this.props;
    const { ReviewActions, ModelActions } = this.props;
    await ReviewActions.getReviewById(id)
  }

  handleOpenCouponModal = () => {
    const { ModalActions } = this.props;
    ModalActions.show({
      visible: "coupon"
    })
  }

  render() {
    const { id } = this.props;
    const { reviewById } = this.props;
    const { handleOpenCouponModal} = this;
    console.log(reviewById.get('modelId'))
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
            modelById={Map(reviewById.get('modelId'))}
            handleOpenCouponModal={handleOpenCouponModal}
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
    ModalActions: bindActionCreators(modalActions, dispatch)
  })
)(ReviewOrderContainer)