import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ModalWrapper } from '../../components/Modal/ModalWrapper';
import { CouponModal } from '../../components/Modal/CouponModal';
import { ReviewCouponQRCode } from '../../components/ReviewCoupon/ReviewCouponQRCode';
import { Dimmed } from '../../components/Modal/Dimmed';

import * as modalActions from '../../store/modules/modal';
import * as couponActions from '../../store/modules/reviewCoupon';

const CryptoJS = require("crypto-js");

class CouponModalContainer extends Component {

  /* For generating QRCODE - START */
  // constructor(props) {
  //   super(props);
  //   this.state = { hash: null };
  // }

  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //   if (prevProps.modelById.size !== this.props.modelById.size) {
  //     if (this.props.couponByHash.size == 0) {
  //       return this.handleGenerateHash();
  //     }
  //   }
  //   return null;
  // }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   // 전형적인 사용 사례 (props 비교를 잊지 마세요)
  //   // console.log(this.state);
  //   if (!this.state.hash) {
  //     Promise.resolve(snapshot).then((value) => {
  //       this.setState(value);
  //     });
  //   }
  // }

  // async shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   const { id } = this.props;
  //   const { loggedInfo, reviewById, modelById, couponByHash } = this.props;
  //   const { ModelActions, ReviewActions, CouponActions } = this.props;

  //   if (reviewById.size !== nextProps.reviewById.size) {
  //     await ModelActions.getModelById(nextProps.reviewById.get('modelId')._id);
  //     return true;
  //   } else if (reviewById.size == 0) {
  //     await ReviewActions.getReviewById(id);
  //     return true;
  //   }
  //   if (modelById.size == 0) return true;
  //   if (nextProps.couponByHash.size !== 0) {
  //     return false;
  //   } else {
  //     return false;
  //   }
  // }

  // async handleGenerateHash() {
  //   const { loggedInfo, reviewById, modelById, couponByHash } = this.props;
  //   const { ReviewActions, ModelActions, CouponActions } = this.props;

  //   try {
  //     const reviewId = reviewById.get('_id');
  //     const modelId = reviewById.get('modelId')._id;
  //     const userId = loggedInfo.get('_id');
  //     const payload = {
  //       reviewId,
  //       modelId,
  //       customerId: userId
  //     };
  //     const key = modelById.get('makerId');//makerId
  //     const hash = CryptoJS.AES.encrypt(JSON.stringify(payload), key);
  //     // const bytes = CryptoJS.AES.decrypt(hash.toString(), key);
  //     await CouponActions.getCouponByReviewId(reviewId);
  //     return { hash: btoa(hash.toString()) };
  //   }
  //   catch (err) {
  //     console.error(err);
  //   }
  // }
  /* For generating QRCODE - END */

  handleHide = () => {
    const { ModalActions, ModelActions } = this.props;
    ModalActions.hide();
  }

  render() {
    const { visible, couponInfo } = this.props;
    const { handleHide } = this;

    console.log(couponInfo)
    return(
      visible==="coupon" &&
      <div>
        <ModalWrapper visible={visible}>
          <CouponModal
            handleHide={handleHide}
            coupon={<ReviewCouponQRCode
              hash={couponInfo.get('hash')}
            />}
          />
        </ModalWrapper>
        <Dimmed/>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    visible: state.modal.get('visible'),
    couponInfo: state.coupon.get('couponInfo')
  }),
  (dispatch) => ({
    ModalActions: bindActionCreators(modalActions, dispatch),    
    CouponActions: bindActionCreators(couponActions, dispatch)    
  })
)(CouponModalContainer);