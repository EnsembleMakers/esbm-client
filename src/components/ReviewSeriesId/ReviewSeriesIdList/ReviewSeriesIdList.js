import React, { Component } from 'react'
import { ReviewSeriesIdItem } from '../ReviewSeriesIdItem';
import './ReviewSeriesIdList.scss';

class ReviewSeriesIdList extends Component {
  render() {
    const { reviewSeries } = this.props;
    const reviewSeriesList = reviewSeries.map(
      (review, i) => 
        <ReviewSeriesIdItem 
          key={i}
          content={review.content}
        />
    )
    return(
      <div>{reviewSeriesList}</div>
    )
  }
}

export default ReviewSeriesIdList;