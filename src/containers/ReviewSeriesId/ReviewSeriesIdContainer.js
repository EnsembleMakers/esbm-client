import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ReviewSeriesIdWrapper } from '../../components/ReviewSeriesId/ReviewSeriesIdWrapper';
import { ReviewSeriesIdList } from '../../components/ReviewSeriesId/ReviewSeriesIdList';
import { ModelInfoFixedBar } from '../../components/ReviewSeriesId/ModelInfoFixedBar';
import * as reviewActions from '../../store/modules/review';
import * as orderActions from '../../store/modules/order';
import * as modelActions from '../../store/modules/model';

class ReviewSeriesIdContainer extends Component {

  async componentDidMount() {
    const { id } = this.props;
    const { ReviewActions, OrderActions, ModelActions } = this.props;
    await ReviewActions.getReviewById(id);
    // 같은 모델 리뷰들 불러오기
    await console.log(this.props.reviewById.get('modelId'))
  }

  render() {
    const { id } = this.props;
    return(
      <ReviewSeriesIdWrapper
        left={<ReviewSeriesIdList/>}
        right={<ModelInfoFixedBar/>}
      />
    )
  }
}

export default connect(
  (state) => ({
    reviewById: state.review.get('reviewById'),
    orderById: state.order.get('orderById')
  }),
  (dispatch) => ({
    ReviewActions: bindActionCreators(reviewActions, dispatch),
    OrderActions: bindActionCreators(orderActions, dispatch),
    ModelActions: bindActionCreators(modelActions, dispatch)
  })
)(ReviewSeriesIdContainer)