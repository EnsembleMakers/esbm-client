import React, { Component } from 'react';
import './ReviewCouponItem.scss'
import { FaStar } from 'react-icons/fa';

import oc from 'open-color';

class ReviewCouponItem extends Component {
  render() {
    const { handleOpenCouponModal } = this.props; 
    const { coupon } = this.props;
    let borderStyle = '';

    console.log(coupon);
    if (coupon.isUsed) borderStyle = `3px solid ${oc.red[7]}`;
    return(    
      <button className="review-coupon-item-wrapper"
        style={{border: `${borderStyle}`}}
        onClick={()=>{handleOpenCouponModal(coupon);}}>
        
        <div className="review-coupon-thumbnail-wrapper">
          <div className="review-coupon-thumbnail">
            <img src={coupon.reviewId.coverImg ? coupon.reviewId.coverImg : "https://icon-library.net/images/not-found-icon/not-found-icon-28.jpg"}/>
          </div>
        </div>
        <div className="review-coupon-item-informations">
          <div className="review-coupon-item-contents">
            <div className="review-coupon-item-name"> {coupon.reviewId.modelId != null &&
                                                      coupon.reviewId.modelId.contents != null &&
                                                      coupon.reviewId.modelId.contents.spec != undefined ?
                                                      coupon.reviewId.modelId.contents.spec.name : '미등록 모델'}</div>
            <div className="review-coupon-item-title">{coupon.reviewId.title}</div>
            <div className="review-coupon-item-rating"><FaStar style={{color:'#fa6e57'}}/> {coupon.reviewId.rating + 1}</div>
          </div>
          <div className="review-coupon-item-user">
            <div className="review-coupon-item-name">고객 정보</div>
            {coupon.userId && 
              <>
                <div className="review-coupon-item-auth">{coupon.userId.username}</div>
                <div className="review-coupon-item-auth">{coupon.userId.email}</div> 
              </>
            } 
            {coupon.orderForm &&
              <>
                <div className="review-coupon-item-auth">{coupon.orderForm.name}</div>
                <div className="review-coupon-item-auth">{coupon.orderForm.phone}</div> 
              </>
            }
          </div>
        </div>
      </button>
    )
  }
}

export default ReviewCouponItem;
