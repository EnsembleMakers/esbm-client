import React, { Component } from 'react';

import { Route } from 'react-router-dom';
import { CouponDetailContainer } from '../containers/Coupon/CouponDetail';

class CouponDetail extends Component {
  render() {
    const { hash } = this.props.match.params;
    // console.log(hash);
    return(
      <CouponDetailContainer hash={hash}/>
    )
  }
}

export default CouponDetail;