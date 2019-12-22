import React, { Component } from 'react';
import './ReviewCouponDetail.scss';

import { ReviewCoupon } from '..';

class ReviewCouponDetail extends Component {
  render() {
    const { detail, hash } = this.props;
    const { handleUseCoupon } = this.props;
    return(
      <>
        {/* <ReviewCoupon 
          hash={hash}
        /> */}
        {detail}
        <div className="review-coupon-use-button" onClick={()=>{handleUseCoupon();}}>사용하기</div>
      </> 
    )
  }
}

export default ReviewCouponDetail;