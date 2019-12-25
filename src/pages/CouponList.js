import React, { Component } from 'react';

import { Route } from 'react-router-dom';
import { CouponListContainer } from '../containers/Coupon/CouponList';

class CouponList extends Component {
  render() {
    return(
      <div>
        <h1>CouponList Test Page</h1>
        <CouponListContainer/>
      </div>
    )
  }
}

export default CouponList;