import React, { Component } from 'react';
import './ReviewOrderInstruction.scss'

class ReviewOrderInstruction extends Component {
  render() {
    const { title } = this.props;
    return(
      <div className="review-order-instruction-wrapper">
        <div className="review-order-header">제품 스토리</div>
        <div className="review-order-cover-img-wrapper">
          <div className="review-order-cover-img">
            <img src="https://image.musinsa.com/mfile_s01/2018/05/11/61dab6ccd19490c00c92eed21f732a04185756.jpg"/>
          </div>
          <div className="review-order-title">{title}</div>
          <div className="review-order-auth">작성자</div>
          <div className="review-order-rating">평점</div>
          <div className="review-order-feature">#넓은볼 #평발</div>
        </div>

      </div>
    )
  }
}

export default ReviewOrderInstruction;