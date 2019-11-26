import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ModalWrapper } from '../../components/Modal/ModalWrapper';
import { CouponModal } from '../../components/Modal/CouponModal';
import { Dimmed } from '../../components/Modal/Dimmed';

import * as modalActions from '../../store/modules/modal';

class CouponModalContainer extends Component {

  handleHide = () => {
    const { ModalActions, ModelActions } = this.props;
    ModalActions.hide();
  }

  render() {
    const { visible } = this.props;
    const { handleHide } = this;
    return(
      visible==="coupon" &&
      <div>
        <ModalWrapper visible={visible}>
          <CouponModal

            handleHide={handleHide}
          />
        </ModalWrapper>
        <Dimmed/>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    visible: state.modal.get('visible')
  }),
  (dispatch) => ({
    ModalActions: bindActionCreators(modalActions, dispatch)
  })
)(CouponModalContainer);