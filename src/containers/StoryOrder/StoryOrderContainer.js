import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import { ReviewOrderWrapper } from '../../components/StoryOrder/ReviewOrderWrapper';
import { ReviewOrderInstruction } from '../../components/StoryOrder/ReviewOrderInstruction';
import { ReviewViewer } from '../../components/StoryOrder/ReviewViewer';
import { ModelInfoFixedBar } from '../../components/StoryOrder/ModelInfoFixedBar';
import { ModelInfoFixedBottom } from '../../components/StoryOrder/ModelInfoFixedBottom';

import * as reviewActions from '../../store/modules/review';
import * as modalActions from '../../store/modules/modal';

class StoryOrderContainer extends Component {

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
    const { handleOpenCouponModal } = this;
    return(
      <ReviewOrderWrapper
        instruction={<ReviewOrderInstruction 
        title={reviewById.get('title')}
        rating={reviewById.get('rating')}
        date={reviewById.get('createdAt')}
        coverImg={reviewById.get('coverImg')}
        />}
    contents={<ReviewViewer 
        content={reviewById.get('content')}
        />}
    fixedBar={<ModelInfoFixedBar 
        buttonOn={true}
        reviewId={reviewById.get('_id')}
        modelById={Map(reviewById.get('modelId'))}
        handleOpenCouponModal={handleOpenCouponModal}
        />}
    fixedBottom={<ModelInfoFixedBottom
      buttonOn={true}
      reviewId={reviewById.get('_id')}
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
)(StoryOrderContainer)