import React, { Component } from 'react';
import './ReviewSeriesItem.scss'
import { FaStar } from 'react-icons/fa';

class ReviewSeriesItem extends Component {
  render() {
    const { reviewData } = this.props;
    return(
      <a className="review-series-item-wrapper" href={`/reviewSeries/${reviewData.modelId}?review=${reviewData._id}`}>
        <div className="review-series-thumbnail-wrapper">
          <div className="review-series-thumbnail">
            <img src={reviewData.images.length != 0 ? reviewData.images[0] : "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile23.uf.tistory.com%2Fimage%2F2657B9505809B4B634FF66"}/>
          </div>
        </div>
        <div className="review-series-item-contents">
          <div className="review-series-item-auth">{reviewData.userId.username}</div>
          <div className="review-series-item-title">{reviewData.title}</div>
          <div className="review-series-item-rating"><FaStar style={{color:'#fa6e57'}}/> {reviewData.rating + 1}</div>
        </div>
      </a>
    )
  }
}

export default ReviewSeriesItem;