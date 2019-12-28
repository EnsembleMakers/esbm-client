import React, { Component } from 'react';
import './ReviewCouponDetail.scss';

import { ReviewCouponQRCode } from '../ReviewCouponQRCode';

class ReviewCouponDetail extends Component {
  render() {
    const { detail } = this.props;
    const { handleUseCoupon } = this.props;
    return(
      <div>
        {detail}
        <div className="review-coupon-use-button" onClick={()=>{handleUseCoupon();}}>사용하기</div>
      </div> 
    )
  }
}

export default ReviewCouponDetail;