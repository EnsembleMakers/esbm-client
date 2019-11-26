import React, { Component } from 'react';
import './CouponModal.scss';
import { FaTimes } from 'react-icons/fa';

class CouponModal extends Component {
  render() {
    const { handleHide } = this.props;
    return(
      <div className="coupon-modal-wrapper">
          <div 
            className="modal-cancel-button"
            onClick={handleHide}
          ><FaTimes/>
          </div>
          <div>내용을 작성해주세요</div>
        </div>
    )
  }
}

export default CouponModal;