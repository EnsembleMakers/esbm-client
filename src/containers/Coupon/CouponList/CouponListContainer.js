import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ReviewCouponList } from '../../../components/ReviewCoupon/ReviewCouponList';
import { CouponModalContainer } from '../../CouponModal';

import * as couponActions from '../../../store/modules/reviewCoupon';
import * as reviewActions from '../../../store/modules/review';
import * as modalActions from '../../../store/modules/modal';

class CouponListContainer extends Component {

  componentDidMount() {
    const { CouponActions } = this.props;
    console.log('mount')
    CouponActions.getAllCoupon();
  }

  handleReview() {
    const { ReviewActions } = this.props;
  }

  handleOpenCouponModal = (coupon) => {
    const { ModalActions, CouponActions } = this.props;

    console.log(coupon);
    CouponActions.setCoupon(coupon);
    ModalActions.show({
        visible: 'coupon',
    });
  }

  render() {
    const { allCoupons } = this.props;
    const { handleOpenCouponModal } = this;
    console.log( allCoupons );

    return(
      <ReviewCouponList
        allCoupons={allCoupons}
        handleOpenCouponModal={handleOpenCouponModal}
      />
    )
  }
}

export default connect(
  (state) => ({
    loggedInfo: state.user.get('loggedInfo'),
    allCoupons: state.coupon.get('allCoupons'),
    couponByHash: state.coupon.get('couponByHash'),
    reviewById: state.review.get('reviewById')
  }),
  (dispatch) => ({
    CouponActions: bindActionCreators(couponActions, dispatch),
    ReviewActions: bindActionCreators(reviewActions, dispatch),
    ModalActions: bindActionCreators(modalActions, dispatch),
  })
)(CouponListContainer);
