import React, { Component } from 'react';
import  { Link } from 'react-router-dom';

import './CouponModal.scss';
import { FaTimes } from 'react-icons/fa';

class CouponModal extends Component {
  render() {
    const { handleHide } = this.props;
    const { coupon, loggedIn } = this.props;
    return(
      <div className="coupon-modal-wrapper">
        <div 
          className="modal-cancel-button"
          onClick={handleHide}
        ><FaTimes/>
        </div>
        <div className="coupon-modal-body">
          <h1>쿠폰이 발급되었습니다</h1>
          <div className="coupon-modal-qrcode">{coupon}</div>
          <div className="coupon-modal-button">
            <Link className="coupon-modal-button-list" to="/myPage/couponList">내 쿠폰함</Link>
            <div className="coupon-modal-button-cancel" onClick={handleHide}>닫기</div>
          </div>
        </div>
      </div>
    )
  }
}

export default CouponModal;