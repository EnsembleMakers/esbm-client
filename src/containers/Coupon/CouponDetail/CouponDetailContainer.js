import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ReviewCoupon } from '../../../components/ReviewCoupon';
import { ReviewCouponError } from '../../../components/ReviewCoupon/ReviewCouponError';
import { ReviewCouponWrapper } from '../../../components/ReviewCoupon/ReviewCouponWrapper';
import { ReviewCouponDetail } from '../../../components/ReviewCoupon/ReviewCouponDetail';
import { ReviewOrderInstruction } from '../../../components/ReviewOrder/ReviewOrderInstruction';

import * as couponActions from '../../../store/modules/reviewCoupon';
import * as reviewActions from '../../../store/modules/review';
import * as modelActions from '../../../store/modules/model';
// import { ReviewCouponError } from '../../../components/ReviewCoupon/ReviewCouponError';

const CryptoJS = require("crypto-js");

function doDecryptData(hash, key, couponByHash) {
  const bytes = CryptoJS.AES.decrypt(atob(hash), key);
  var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  if (decryptedData.reviewId !== couponByHash.get('reviewId')) {
    throw "Error occured";
  }
  return null;
}

class CouponDetailContainer extends Component {
  static async getDerivedStateFromProps(nextProps, prevState) {
    // console.log(nextProps.loggedInfo.size);
    if (nextProps.loggedInfo.size !== 0) {
      const { reviewById, couponByHash, error } = nextProps;
      const { CouponActions, ReviewActions } = nextProps;
      const { hash } = nextProps;
      if (couponByHash.size !==0 ) {
        // const bytes = CryptoJS.AES.decrypt(atob(hash), nextProps.loggedInfo.get('_id'));
        try {
          // console.log('ddd');
          doDecryptData(hash, nextProps.loggedInfo.get('_id'), couponByHash);
          if (nextProps.reviewById.size === 0) {
            await ReviewActions.getReviewById(couponByHash.get('reviewId'));
          }
          return null;
        } catch (error) {
          // console.log( error );
          await CouponActions.setError({message: '잘못된 정보입니다. 다시 확인해주세요.'});
          return null;
        }
      }
      try {
        await CouponActions.getCouponByHash(hash);
      } catch {
        await CouponActions.setError({message: '잘못된 정보입니다. 다시 확인해주세요.'});
        return null;
      }
    }
    return null;
  }

  handleUseCoupon = async () => {
    const { couponByHash } = this.props;
    const { CouponActions } = this.props;

    await CouponActions.patchCoupon({
      hash: this.props.hash,
      reviewId: couponByHash.get('reviewId')      
    });
  }

  render() {
    const { reviewById, couponByHash, error } = this.props;
    const { hash } = this.props;

    console.log(reviewById);
    return(
      <ReviewCouponWrapper>
        {!error ? (
          <ReviewCouponDetail
            detail={
              <ReviewOrderInstruction 
                title={reviewById.get('title')}
                coverImg={reviewById.get('coverImg')}
              />
            }
            handleUseCoupon={this.handleUseCoupon}
          />
        ) : (
          <ReviewCouponError>{error}</ReviewCouponError>
        )}
      </ReviewCouponWrapper>
    )
  }
}

export default connect(
  (state) => ({
    loggedInfo: state.user.get('loggedInfo'),
    allCoupons: state.coupon.get('allCoupons'),
    couponByHash: state.coupon.get('couponByHash'),
    error: state.coupon.get('error'),
    reviewById: state.review.get('reviewById')
  }),
  (dispatch) => ({
    CouponActions: bindActionCreators(couponActions, dispatch),
    ReviewActions: bindActionCreators(reviewActions, dispatch),
    ModelActions: bindActionCreators(modelActions, dispatch)
  })
)(CouponDetailContainer);
