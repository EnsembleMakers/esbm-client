import React, { Component } from 'react';
import './ReviewSeriesItem.scss'
import { FaStar } from 'react-icons/fa';

class ReviewSeriesItem extends Component {
  render() {
    const { reviewData } = this.props;
    return(
      // reviewSeriesId 아직 사용 안함
      // <a className="review-series-item-wrapper" href={`/reviewSeries/${reviewData.modelId._id}?review=${reviewData._id}`}>
      <a className="review-series-item-wrapper" href={`/reviewOrder/${reviewData._id}`}>
        <div className="review-series-thumbnail-wrapper">
          <div className="review-series-thumbnail">
            <img src={reviewData.coverImg ? reviewData.coverImg : "https://icon-library.net/images/not-found-icon/not-found-icon-28.jpg"}/>
          </div>
        </div>
        <div className="review-series-item-contents">
          <div className="review-series-item-name">{reviewData.spec ? reviewData.modelId.spec.name : '미등록 모델'}</div>
          <div className="review-series-item-title">{reviewData.title}</div>
          <div className="review-series-item-auth">{reviewData.userId.username}</div>
          <div className="review-series-item-rating"><FaStar style={{color:'#fa6e57'}}/> {reviewData.rating + 1}</div>
          
        </div>
      </a>
    )
  }
}

export default ReviewSeriesItem;
