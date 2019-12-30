import React, { Component } from 'react';
import './ReviewCouponWrapper.scss';

class ReviewCouponWrapper extends Component {
  render() {
    const { children } = this.props;
    return(
      <div className="review-coupon-wrapper">
        <div className="review-coupon-header">구매권 확인</div>
        <div className="review-coupon-body">{children}</div>
      </div>
    )
  }
}

export default ReviewCouponWrapper;