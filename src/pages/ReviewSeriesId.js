import React, { Component } from 'react'
import queryString from 'query-string';
import { ReviewSeriesIdContainer } from '../containers/ReviewSeriesId';

class ReviewSeriesId extends Component {
  render() {
    // url: /reviewSeries/{modelId}?review={reviewId}
    const { model } = this.props.match.params;
    const query = queryString.parse(this.props.location.search)
    return(
      <ReviewSeriesIdContainer model={model} review={query.review}/>
    )
  }
}

export default ReviewSeriesId;