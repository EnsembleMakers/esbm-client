import React, { Component } from 'react';

import { Route } from 'react-router-dom';
import { CouponListContainer } from '../containers/Coupon/CouponList';
import { CouponModalContainer } from '../containers/CouponModal';

class CouponList extends Component {
  render() {
    return(
      <>
        <CouponListContainer/>
        <CouponModalContainer/>
      </>
    )
  }
}

export default CouponList;