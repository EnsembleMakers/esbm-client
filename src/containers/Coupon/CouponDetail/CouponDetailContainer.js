import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import { ReviewCoupon } from '../../../components/ReviewCoupon';
import { ReviewCouponInfo } from '../../../components/ReviewCoupon/ReviewCouponInfo';
import { ReviewCouponWrapper } from '../../../components/ReviewCoupon/ReviewCouponWrapper';
import { ReviewCouponDetail } from '../../../components/ReviewCoupon/ReviewCouponDetail';
import { ReviewOrderInstruction } from '../../../components/ReviewOrder/ReviewOrderInstruction';

import * as couponActions from '../../../store/modules/reviewCoupon';
import * as reviewActions from '../../../store/modules/review';
import * as modelActions from '../../../store/modules/model';
// import { ReviewCouponInfo } from '../../../components/ReviewCoupon/ReviewCouponInfo';

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
  // async componentWillReceiveProps(nextProps){
    // console.log(nextProps.loggedInfo.size);
    if (nextProps.loggedInfo.size !== 0) {
      const { reviewById, couponByHash, infoMessage } = nextProps;
      const { CouponActions, ReviewActions } = nextProps;
      const { hash } = nextProps;
      if (couponByHash.size !==0 ) {
        if (couponByHash.get('isUsed') === true && infoMessage.get('type') !== 'success') {
          alert('이미 사용한 티켓입니다');
          window.location = await '/';
        }
        // const bytes = CryptoJS.AES.decrypt(atob(hash), nextProps.loggedInfo.get('_id'));
        try {
          // console.log('ddd');
          doDecryptData(hash, nextProps.loggedInfo.get('_id'), couponByHash);
          if (nextProps.reviewById.size === 0) {
            await ReviewActions.getReviewById(couponByHash.get('reviewId'));
          }
          return null;
        } catch (err) {
          // console.log( error );
          await CouponActions.setMessage({type: 'error', message: '잘못된 정보입니다. 다시 확인해주세요.'});
          return null;
        }
      } else {
        if (infoMessage.get('type') === 'error'){
          return null;
        }
      }
      try {
        await CouponActions.getCouponByHash(hash);
      } catch {
        await CouponActions.setMessage({type: 'error', message: '잘못된 정보입니다. 다시 확인해주세요.'});
        return null;
      }
    }
    return null;
  }

  handleUseCoupon = async () => {
    const { couponByHash } = this.props;
    const { CouponActions } = this.props;

    await CouponActions.setMessage({
      type: 'success',
      message: '티켓을 성공적으로 사용했습니다'
    });
    await CouponActions.patchCoupon({
      hash: this.props.hash,
      reviewId: couponByHash.get('reviewId')      
    });
  }

  render() {
    const { reviewById, couponByHash, infoMessage } = this.props;
    const { hash } = this.props;

    return(
      <ReviewCouponWrapper>
        {infoMessage.get('type')==='' ? (
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
          <ReviewCouponInfo
            type={infoMessage.get('type')}
            message={infoMessage.get('message')}
          />
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
    infoMessage: state.coupon.get('infoMessage'),
    reviewById: state.review.get('reviewById')
  }),
  (dispatch) => ({
    CouponActions: bindActionCreators(couponActions, dispatch),
    ReviewActions: bindActionCreators(reviewActions, dispatch),
    ModelActions: bindActionCreators(modelActions, dispatch)
  })
)(CouponDetailContainer);
