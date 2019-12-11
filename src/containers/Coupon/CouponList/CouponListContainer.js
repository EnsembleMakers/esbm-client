import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ReviewCoupon } from '../../../components/ReviewCoupon'

import * as couponActions from '../../../store/modules/reviewCoupon';

// for test
// import SHA256 from 'crypto-js/sha256';
import AES from 'crypto-js/aes';

class CouponListContainer extends Component {

  async componentWillReceiveProps(nextProps) {
    if(this.props.loggedInfo !== nextProps.loggedInfo){
      const { CouponActions } = this.props;

      await CouponActions.getAllCoupon();
    }
  }

  handleGenerateHash = async () => {
    const { loggedInfo } = this.props;
    const { CouponActions } = this.props;

    const reviewId = "5ddfc900107f5f5aa839e391";
    const userId = loggedInfo.get('_id');
    const payload = {
      "reviewId": reviewId,
      "modelId": "5dbe3f421079be016454c9d6",
      "customerId": userId
    };
    const key = "5db04c0e04391da8ac3466db";//makerId
    const tmpHash = AES.encrypt(JSON.stringify(payload), key);
    
    console.log( tmpHash );
    console.log( AES.decrypt(tmpHash, key) );
    await CouponActions.postCoupon({
      reviewId,
      userId,
      hash: tmpHash.toString()
    });
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
