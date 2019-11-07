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
    const { ReviewActions } = this.props;
    window.addEventListener('scroll', this.handleScroll);

    const modelId = this.props.model;
    const reviewId = this.props.review;
    // reviewId query-string으로 받았을 경우
    if(reviewId){
      await ReviewActions.getReviewById(reviewId);
      // review selected: True
      await ReviewActions.changeSelected(true)
    }
    // 같은 모델 리뷰들 불러오기
    // getReviewById (selected)가 있을 경우 그 리뷰를 가장 위로 올리기 위해 reviewId 전달
    await ReviewActions.getReviewSeries(`offset=${0}&model=${modelId}&review=${reviewId}`)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    const { reviewSeries } = this.props;
    return(
      <ReviewSeriesIdWrapper
        left={<ReviewSeriesIdList reviewSeries={reviewSeries}/>}
        right={<ModelInfoFixedBar/>}
      />
    )
  }
}

export default connect(
  (state) => ({
    reviewById: state.review.get('reviewById'),
    reviewSeries: state.review.get('reviewSeries'),
    orderById: state.order.get('orderById')
  }),
  (dispatch) => ({
    ReviewActions: bindActionCreators(reviewActions, dispatch),
    OrderActions: bindActionCreators(orderActions, dispatch),
    ModelActions: bindActionCreators(modelActions, dispatch)
  })
)(ReviewSeriesIdContainer)