import React, { Component } from 'react';
import './ReviewSeriesIdItem.scss';

class ReviewSeriesIdItem extends Component {
  render() {
    const { content } = this.props;
    return(
      <div className="review-series-id-item-wrapper">{content}</div>
    )
  }
}

export default ReviewSeriesIdItem;