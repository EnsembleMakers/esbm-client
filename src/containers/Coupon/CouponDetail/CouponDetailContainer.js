import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import { ReviewCouponQRCode } from '../../../components/ReviewCoupon/ReviewCouponQRCode';
import { ReviewCouponInfo } from '../../../components/ReviewCoupon/ReviewCouponInfo';
import { ReviewCouponWrapper } from '../../../components/ReviewCoupon/ReviewCouponWrapper';
import { ReviewCouponDetail } from '../../../components/ReviewCoupon/ReviewCouponDetail';
import { LinkReviewInfo } from '../../../components/Order/LinkReviewInfo';

import * as orderActions from '../../../store/modules/order';
import * as couponActions from '../../../store/modules/reviewCoupon';
import * as reviewActions from '../../../store/modules/review';
import * as modelActions from '../../../store/modules/model';
// import { ReviewCouponInfo } from '../../../components/ReviewCoupon/ReviewCouponInfo';

const CryptoJS = require("crypto-js");

class CouponDetailContainer extends Component {
  async componentDidMount() {
    const { reviewById, infoMessage } = this.props;
    const { hash } = this.props;
    const { CouponActions, ReviewActions } = this.props;
    
    try {
      let couponByHash = await CouponActions.getCouponByHash(hash);
      couponByHash = couponByHash.data;
      if (couponByHash.isUsed === true && infoMessage.get('type') !== 'success') {
        alert('이미 사용한 티켓입니다');
        window.location = await '/';
      }

      this.doDecryptData(hash, this.props.loggedInfo.get('_id'));
      if (this.props.reviewById.size === 0) {
        await ReviewActions.getReviewById(couponByHash.reviewId);
      }
      return null;

    }catch {
      await CouponActions.setMessage({type: 'error', message: '잘못된 정보입니다. 다시 확인해주세요.'});
      return null;
    }
  }

  doDecryptData = (hash, key) => {
    const bytes = CryptoJS.AES.decrypt(atob(hash), key);
    const { couponByHash } = this.props;
    
    try {
      let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      if (decryptedData.reviewId !== couponByHash.get('reviewId')) {
        throw "Error occured";
      }
    } catch (err) {
      throw "Error occured";
    }
    return null;
  }

  handleUseCoupon = async () => {
    const { couponByHash } = this.props;
    const { CouponActions, OrderActions } = this.props;

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
              <LinkReviewInfo
                reviewData={reviewById}
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
    OrderActions: bindActionCreators(orderActions, dispatch),
    CouponActions: bindActionCreators(couponActions, dispatch),
    ReviewActions: bindActionCreators(reviewActions, dispatch),
    ModelActions: bindActionCreators(modelActions, dispatch)
  })
)(CouponDetailContainer);
