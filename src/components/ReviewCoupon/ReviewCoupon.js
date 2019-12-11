import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import SHA256 from 'crypto-js/sha256';

class ReviewCoupon extends Component {
  render() {
    const { hash } = this.props;
    // const { reviewId, userId } = this.props;
    return <QRCode value={'http://localhost:3000/coupon/'+hash}/>
  }
}

export default ReviewCoupon;