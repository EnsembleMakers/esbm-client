import React, { Component } from 'react'

import { ReviewSeriesIdContainer } from '../containers/ReviewSeriesId';

class ReviewSeriesId extends Component {
  render() {
    const { id } = this.props.match.params;
    return(
      <ReviewSeriesIdContainer id={id}/>
    )
  }
}

export default ReviewSeriesId;