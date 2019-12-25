import React, { Component } from 'react';
import QRCode from 'qrcode.react';

import './ReviewCoupon.scss';

class ReviewCoupon extends Component {
  render() {
    const { hash } = this.props;
    // console.log( hash );
    // console.log( atob(hash) );
    // console.log( process.env );
    return (
      <div className="review-qrcode">
        <QRCode value={`${process.env.REACT_APP_PUBLIC_URL}/coupon/${hash}`}/>
      </div>
    )
  }
}

export default ReviewCoupon;