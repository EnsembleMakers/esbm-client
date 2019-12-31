import React, { Component } from 'react';
import { ReviewSeriesItem } from '../ReviewSeriesItem';
import './ReviewSeriesList.scss';

class ReviewSeriesList extends Component {
  render() {
    const { reviewSeries } = this.props;
    const reviewSeriesList = reviewSeries
      .map(
        (reviewData, i) =>
          <ReviewSeriesItem 
            key={i}
            reviewData={reviewData}
          />
      )

    return(
      <div className="review-series-list-wrapper">
        <div className="review-series-list-header">리뷰 확인하기</div>
        <div style={{'fontSize': '25px', 'color': '#484848', 'fontWeight': 700, 'paddingBottom': '15px'}}>성수동</div>
        <div className="review-series-list">{reviewSeriesList}</div>
      </div>
    )
  }
}

export default ReviewSeriesList;