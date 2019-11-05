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
        {reviewSeriesList}
      </div>
    )
  }
}

export default ReviewSeriesList;