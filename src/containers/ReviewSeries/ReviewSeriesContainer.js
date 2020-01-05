import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import throttle from 'lodash/throttle';
import { ReviewSeriesList } from '../../components/ReviewSeries/ReviewSeriesList';
import * as reviewActions from '../../store/modules/review';

class ReviewSeriesContainer extends Component {
  async componentDidMount() {
    const { ReviewActions } = this.props;
    await ReviewActions.initReviewSeries()
    await ReviewActions.getReviewSeries(`offset=${0}`)
    await window.addEventListener('scroll', this.handleScroll);
    
  }
  async componentWillUnmount() {
    await window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = throttle(() => {
    const { ReviewActions } = this.props;
    const { lastSeries } = this.props;
    const { innerHeight } = window;
    const { scrollHeight } = document.body;

    const scrollTop =
    (document.documentElement && document.documentElement.scrollTop) ||
    document.body.scrollTop;

    if (scrollHeight - innerHeight - scrollTop < 100) {
      if(!lastSeries){
        ReviewActions.getReviewSeries(`offset=${1}`)
      }
    }
  }, 1250)

  render() {
    const { reviewSeries } = this.props;
    return(
      <ReviewSeriesList
        reviewSeries={reviewSeries}
      />
    )
  }
}

export default connect(
  (state) => ({
    reviewSeries: state.review.get('reviewSeries'),
    lastSeries: state.review.get('lastSeries')
  }),
  (dispatch) => ({
    ReviewActions: bindActionCreators(reviewActions, dispatch)
  })
)(ReviewSeriesContainer);
