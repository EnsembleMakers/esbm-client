import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ModalWrapper } from '../../components/Modal/ModalWrapper';
import { CouponModal } from '../../components/Modal/CouponModal';
import { ReviewCoupon } from '../../components/ReviewCoupon';
import { Dimmed } from '../../components/Modal/Dimmed';

import * as modalActions from '../../store/modules/modal';
import * as reviewActions from '../../store/modules/review';
import * as modelActions from '../../store/modules/model';
import * as couponActions from '../../store/modules/reviewCoupon';

const CryptoJS = require("crypto-js");

class CouponModalContainer extends Component {

  constructor(props) {
    super(props);
    this.state = { hash: null };
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevProps.modelById.size !== this.props.modelById.size) {
      if (this.props.couponByHash.size == 0) {
        return this.handleGenerateHash();
      }
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // 전형적인 사용 사례 (props 비교를 잊지 마세요)
    // console.log(this.state);
    if (!this.state.hash) {
      Promise.resolve(snapshot).then((value) => {
        this.setState(value);
      });
    }
  }

  async shouldComponentUpdate(nextProps, nextState, nextContext) {
    const { id } = this.props;
    const { loggedInfo, reviewById, modelById, couponByHash } = this.props;
    const { ModelActions, ReviewActions, CouponActions } = this.props;

    if (reviewById.size !== nextProps.reviewById.size) {
      await ModelActions.getModelById(nextProps.reviewById.get('modelId')._id);
      return true;
    } else if (reviewById.size == 0) {
      await ReviewActions.getReviewById(id);
      return true;
    }
    if (modelById.size == 0) return true;
    if (nextProps.couponByHash.size !== 0) {
      return false;
    } else {
      return false;
    }
  }

  async handleGenerateHash() {
    const { loggedInfo, reviewById, modelById, couponByHash } = this.props;
    const { ReviewActions, ModelActions, CouponActions } = this.props;

    try {
      // console.log('handleGenerateHash()1');
      const reviewId = reviewById.get('_id');
      const modelId = reviewById.get('modelId')._id;
      const userId = loggedInfo.get('_id');
      // console.log(`${reviewId}`);
      // console.log(`${modelId}`);
      // console.log(`${userId}`);
      const payload = {
        reviewId,
        modelId,
        customerId: userId
      };
      const key = modelById.get('makerId');//makerId
      // console.log('handleGenerateHash()2');
      // console.log(payload);
      // console.log( modelById );
      // console.log('handleGenerateHash()2');
      const hash = CryptoJS.AES.encrypt(JSON.stringify(payload), key);
      // console.log(`${hash.toString}`);
      const bytes = CryptoJS.AES.decrypt(hash.toString(), key);
      // var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      // console.log(hash.toString());
      // console.log( decryptedData );
      console.log('generate')
      await CouponActions.getCouponByReviewId(reviewId);
      return { hash: btoa(hash.toString()) };
    }
    catch (err) {
      console.error(err);
    }
  }

  handleHide = () => {
    const { ModalActions, ModelActions } = this.props;
    ModalActions.hide();
  }

  render() {
    const { visible } = this.props;
    const { loggedInfo, reviewById, couponByHash } = this.props;
    const { handleHide } = this;

    return(
      visible==="coupon" &&
      <div>
        <ModalWrapper visible={visible}>
          <CouponModal
            handleHide={handleHide}
            coupon={<ReviewCoupon
              hash={couponByHash.get('hash')}
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
    loggedInfo: state.user.get('loggedInfo'),
    reviewById: state.review.get('reviewById'),
    modelById: state.model.get('modelById'),
    couponByHash: state.coupon.get('couponByHash')
    // couponByReviewId: state.coupon.get('couponByReviewId')
  }),
  (dispatch) => ({
    ModalActions: bindActionCreators(modalActions, dispatch),
    ReviewActions: bindActionCreators(reviewActions, dispatch),
    ModelActions: bindActionCreators(modelActions, dispatch),
    CouponActions: bindActionCreators(couponActions, dispatch)
  })
)(CouponModalContainer);