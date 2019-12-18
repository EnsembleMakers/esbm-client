import React, { Component } from 'react';
import './ReviewOrderInstruction.scss'

class ReviewOrderInstruction extends Component {
  render() {
    const { title, coverImg } = this.props;
    return(
      <div className="review-order-instruction-wrapper">
        <div className="review-order-cover-img-wrapper">
          <div className="review-order-cover-img">
            <img src={coverImg}/>
          </div>
        </div>
        <div className="review-order-instruction-contents">
          <div className="title">{title}</div>
          <div className="auth">작성자</div>
          <div className="rating">평점</div>
          <div className="feature">#넓은볼 #평발</div>
        </div>
      </div>
    )
  }
}

export default ReviewOrderInstruction;