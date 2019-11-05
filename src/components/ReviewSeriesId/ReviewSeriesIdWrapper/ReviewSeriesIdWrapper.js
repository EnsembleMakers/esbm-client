import React, { Component } from 'react';
import './ReviewSeriesIdWrapper.scss';

class ReviewSeriesIdWrapper extends Component {
  render() {
    const { right, left } = this.props;
    return(
      <div className="review-series-id-wrapper">
        <div style={{'textAlign': 'center'}}>안녕하세요</div>
        <div className="review-series-id-list">
          <div className="review-series-id-left">{left}</div>
          <div className="review-series-id-right">{right}</div>
        </div>
      </div>
    )
  }
}

export default ReviewSeriesIdWrapper;