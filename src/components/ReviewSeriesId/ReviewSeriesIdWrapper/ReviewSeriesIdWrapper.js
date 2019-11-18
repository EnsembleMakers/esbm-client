import React, { Component } from 'react';
import './ReviewSeriesIdWrapper.scss';

class ReviewSeriesIdWrapper extends Component {
  render() {
    const { right, left } = this.props;
    return(
      <div className="review-series-id-wrapper">
        <div style={{'textAlign': 'center', 'marginTop': '80px', 'marginBottom': '20px', 'fontWeight': '700', 'fontSize': '32px'}}>제품 리뷰 살펴보기</div>
        <div className="review-series-id-list">
          <div className="review-series-id-left">{left}</div>
          <div className="review-series-id-right">{right}</div>
        </div>
      </div>
    )
  }
}

export default ReviewSeriesIdWrapper;