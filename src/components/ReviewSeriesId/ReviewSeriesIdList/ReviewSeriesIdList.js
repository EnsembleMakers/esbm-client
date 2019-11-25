import React, { Component } from 'react'
import { ReviewSeriesIdItem } from '../ReviewSeriesIdItem';
import './ReviewSeriesIdList.scss';

class ReviewSeriesIdList extends Component {
  render() {
    const { reviewById, reviewSeries } = this.props;
    const { handleGetById } = this.props;

    const reviewSeriesList = reviewSeries.map(
      (review, i) => 
        <ReviewSeriesIdItem 
          key={i}
          reviewData={review}
          reviewById={reviewById}
          handleGetById={handleGetById}
        />
    )

    return(
      <div>
        {reviewSeriesList}
      </div>
    )
  }
}

export default ReviewSeriesIdList;