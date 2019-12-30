import React, { Component } from 'react';
import { ReviewRatingPlain } from '../ReviewRatingPlain';
import { FaAngleRight } from 'react-icons/fa';
import './LinkReviewInfo.scss'

import { formatDate } from '../../../lib/dateFunction';

class LinkReviewInfo extends Component {
  render() {
    const { reviewData } = this.props;
    return(
      <div className="link-review-info-wrapper">
        <div className="link-review-info-title">선택한 리뷰</div>
        <div className="link-review-info-img-wrapper">
          <div className="link-review-info-img">
            <img src={reviewData.get('coverImg')}/>
          </div>
        </div>
        <div className="link-review-info-content-wrapper">
          <div className="title">{reviewData.get('title')}</div>
          <div className="date">{formatDate(reviewData.get('createdAt'))}</div>
          <div className="rating"><ReviewRatingPlain rating={reviewData.get('rating')}/></div>
        </div>
        <div className="link-review-info-angle-button">
          <FaAngleRight/>
        </div>
      </div>
    )
  }
}

export default LinkReviewInfo;