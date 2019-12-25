import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { CustomerInfoWrapper } from '../../components/CustomerInfo/CustomerInfoWrapper';
import { CustomerInfoInput } from '../../components/CustomerInfo/CustomerInfoInput';
import { CustomerInfoPostButton } from '../../components/CustomerInfo/CustomerInfoPostButton';
import { CustomerInfoError } from '../../components/CustomerInfo/CustomerInfoError';

import * as orderActions from '../../store/modules/order';
import * as reviewActions from '../../store/modules/review';
import * as couponActions from '../../store/modules/reviewCoupon';

import queryString from 'query-string';
const CryptoJS = require("crypto-js");

class ReviewOrderFormContainer extends Component {

  static async getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps);
    
    if (nextProps.reviewById.size !== 0) {
      if (nextProps.couponByHash.size !== 0) {
        window.location = await '/customerInfoSuccess';
        return null;
      } else {
        if (nextProps.couponError) {
          // console.log(nextProps.couponError);
          return nextProps.OrderActions.setError({ message: "이미 등록된 주문입니다"});
        } 
      }
    }
  }

  componentDidMount() {
    const { OrderActions, ReviewActions } = this.props;
    const { modelName } = this.props;
    const { location } = this.props;

    if (location.search.length !== 0) {
      const query = queryString.parse(location.search);
      if (query.rid === undefined){
        alert('리뷰를 보고 구매티켓을 받아주세요');
        // temp
        window.location = '/reviewSeries';
        return;
      } else {
        // console.log(`rid = ${query.rid}`);
        ReviewActions.getReviewById(query.rid);
      }
    } else {
      alert('리뷰를 보고 구매티켓을 받아주세요');
      // temp
      window.location = '/reviewSeries';
      return;
    }

    OrderActions.getOrderPostFormByModel(modelName);
  }

  handleChangeCustomerInfoInput = (e) => {
    const { OrderActions } = this.props;
    const { name } = e.target;
    let { value } = e.target;
    if(name=='phone'){
      value = this.autoHypenPhone(value)
    }
    OrderActions.changeCustomerInfoInput({
      name,
      value,
    });
  }

  // temporary function
  async handleGenerateHash(customerInfo) {
    const { reviewById, couponByHash } = this.props;
    const { CouponActions } = this.props;

    try {
      const reviewId = reviewById.get('_id');
      const modelId = reviewById.get('modelId')._id;
      const userId = {...customerInfo};
      const payload = {
        reviewId,
        modelId,
        customerId: userId
      };
      const key = this.props.postForm.toJS().model._id;//makerId
      const hash = CryptoJS.AES.encrypt(JSON.stringify(payload), key);
      // const bytes = CryptoJS.AES.decrypt(hash.toString(), key);
      // await CouponActions.getCouponByReviewId(reviewId);
      return { hash: btoa(hash.toString()) };
    }
    catch (err) {
      console.error(err);
    }
  }

  handlePost = async(e) => {
    const { OrderActions, CouponActions } = this.props;
    const { postForm, reviewById, couponByHash, couponError } = this.props;
    const { name, phone } = postForm.toJS().customerInfo;
    const modelId = this.props.postForm.toJS().model._id;
    let { contents, makerId } = this.props.postForm.toJS().model;
    // spec은 삭제하고 order post
    delete contents.spec;
    const modelImage = this.props.postForm.toJS().model.modelImage;

    try {
      if(!this.validate['name'](name)
      ||!this.validate['phone'](phone)
      ) {
        return
      }

      // customerInfo
      let customerInfo = {}
      customerInfo['name'] = name;
      customerInfo['phone'] = phone;

      // for coupon issue 
      const reviewId = reviewById.get('_id');
      const userId = JSON.stringify(customerInfo);
      const { hash } = await this.handleGenerateHash(customerInfo);

      await OrderActions.postOrder({customerInfo, makerId, modelId, contents, modelImage});
      await CouponActions.postCoupon({reviewId, userId, hash});
    } catch(e) {
      console.log(e);
    }
  }

  validate = {
    name: (name) => {
      if(!name) {
        const { OrderActions } = this.props;
        OrderActions.setError({ message: "이름을 입력하세요."})
        return false;
      }
      return true;
    },
    phone: (phone) => {
      const { OrderActions } = this.props;
      if(!phone) {
        OrderActions.setError({ message: "전화번호을 입력하세요."})
        return false;
      }
      const phoneRegex = /^\d{3}-\d{3,4}-\d{4}$/
      let error = !phone.match(phoneRegex)
      // console.log(phone)
      // console.log(error)
      if(error) {
        OrderActions.setError({ message: "전화번호를 확인해주세요."})
        return false;
      }
      return true;
    }
  }

  autoHypenPhone = (str) => {
    str = str.replace(/[^0-9]/g, '');
    let tmp = '';
    if( str.length < 4){
      return str;
    }else if(str.length < 7){
      tmp += str.substr(0, 3);
      tmp += '-';
      tmp += str.substr(3);
      return tmp;
    }else if(str.length < 11){
      tmp += str.substr(0, 3);
      tmp += '-';
      tmp += str.substr(3, 3);
      tmp += '-';
      tmp += str.substr(6);
      return tmp;
    }else{              
      tmp += str.substr(0, 3);
      tmp += '-';
      tmp += str.substr(3, 4);
      tmp += '-';
      tmp += str.substr(7, 4);
      return tmp;
    }
    return str;
  }


  render() {
    const { postForm, error } = this.props;
    const { handleChangeCustomerInfoInput, handlePost } = this;
    return(
      <CustomerInfoWrapper
        companyName={postForm.getIn(['model', 'contents', 'spec', 'name'])}
      >
        <CustomerInfoInput
          label="이름"
          name="name"
          placeholder="이름을 작성해주세요"
          inputView={true}
          buttonView={false}
          times={1}
          value={postForm.getIn(['customerInfo', 'name'])}
          onChange={handleChangeCustomerInfoInput}
        />
        <CustomerInfoInput
          label="전화번호"
          name="phone"
          placeholder="010-1234-1234"
          inputView={true}
          buttonView={false}
          times={1}
          value={postForm.getIn(['customerInfo', 'phone'])}
          onChange={handleChangeCustomerInfoInput}
        />
        { error &&
          <CustomerInfoError>{error}
          </CustomerInfoError>
        }
        <CustomerInfoPostButton
          onClick={handlePost}
        />
      </CustomerInfoWrapper>
    )
  }
}

export default connect(
  (state) => ({
    postForm: state.order.get('postForm'),
    error: state.order.get('error'),
    reviewById: state.review.get('reviewById'),
    couponByHash: state.coupon.get('couponByHash'),
    couponError: state.coupon.get('error')
  }),
  (dispatch) => ({
    OrderActions: bindActionCreators(orderActions, dispatch),
    ReviewActions: bindActionCreators(reviewActions, dispatch),
    CouponActions: bindActionCreators(couponActions, dispatch)
  })
)(ReviewOrderFormContainer);