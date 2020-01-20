import React, { Component } from 'react';
import { ReviewCouponItem } from '../ReviewCouponItem';
import './ReviewCouponList.scss';

class ReviewCouponList extends Component {
  render() {
    const { handleOpenCouponModal } = this.props;
    const { allCoupons } = this.props;
    const couponList = allCoupons
      .map(
        (coupon, i) =>
          <ReviewCouponItem 
            key={i}
            coupon={coupon}
            handleOpenCouponModal={handleOpenCouponModal}
          />
      )

    return(
      <div className="review-coupon-list-wrapper">
        <div className="review-coupon-list-header">쿠폰 목록</div>
        <div className="review-coupon-list">{couponList}</div>
      </div>
    )
  }
}

export default ReviewCouponList;