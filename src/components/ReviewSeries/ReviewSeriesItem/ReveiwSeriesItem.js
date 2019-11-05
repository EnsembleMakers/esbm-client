import React, { Component } from 'react';
import './ReviewSeriesItem.scss'

class ReviewSeriesItem extends Component {
  render() {
    const { reviewData } = this.props;
    return(
      <a className="review-series-item-wrapper" href={`/reviewSeries/${reviewData._id}`}>
        <img className="review-series-item-img" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile23.uf.tistory.com%2Fimage%2F2657B9505809B4B634FF66"/>
        <div className="review-series-item-contents">
          <div className="review-series-item-model">모델이름</div>
          <div className="review-series-item-title">{reviewData.content+reviewData.content+reviewData.content+reviewData.content+reviewData.content+reviewData.content+reviewData.content+reviewData.content+reviewData.content}</div>
          <div className="review-series-item-rating">평점: 3.5</div>
        </div>
      </a>
    )
  }
}

export default ReviewSeriesItem;