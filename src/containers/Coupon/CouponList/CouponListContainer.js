import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ReviewCoupon } from '../../../components/ReviewCoupon'

import * as couponActions from '../../../store/modules/reviewCoupon';

class CouponListContainer extends Component {

  componentDidMount() {
    const { CouponActions } = this.props;

    CouponActions.getAllCoupon();
  }

  render() {
    const { allCoupons } = this.props;
    console.log( allCoupons );
    return(
      <div>
        <ReviewCoupon 
          hash='test'
        />
        <button onClick={()=>{this.handleGenerateHash();}}>Generate HASH</button>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    loggedInfo: state.user.get('loggedInfo'),
    allCoupons: state.coupon.get('allCoupons'),
    couponByHash: state.coupon.get('couponByHash')
  }),
  (dispatch) => ({
    CouponActions: bindActionCreators(couponActions, dispatch)
  })
)(CouponListContainer);
