import React, { Component } from 'react';
import { ReviewRatingPlain } from '../../Order/ReviewRatingPlain';
import './ReviewOrderInstruction.scss'

import { formatDate } from '../../../lib/dateFunction';

class ReviewOrderInstruction extends Component {
  render() {
    const { title, rating, date, coverImg } = this.props;
    return(
      <div className="review-order-instruction-wrapper">
        <div className="review-order-cover-img-wrapper">
          <div className="review-order-cover-img">
            <img src={coverImg}/>
          </div>
        </div>
        <div className="review-order-instruction-contents">
          <div className="title">{title}</div>
          <div className="date">작성일 <b>{formatDate(date)}</b></div>
          {/* <div className="auth">작성자</div> */}
          <div className="rating"><ReviewRatingPlain rating={rating}/></div>
          {/* <div className="feature">#넓은볼 #평발</div> */}
        </div>
      </div>
    )
  }
}

export default ReviewOrderInstruction;