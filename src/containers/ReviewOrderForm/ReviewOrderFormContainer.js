import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { CustomerInfoWrapper } from '../../components/CustomerInfo/CustomerInfoWrapper';
import { CustomerInfoInput } from '../../components/CustomerInfo/CustomerInfoInput';
import { CustomerInfoPostButton } from '../../components/CustomerInfo/CustomerInfoPostButton';
import { CustomerInfoError } from '../../components/CustomerInfo/CustomerInfoError';

import * as orderActions from '../../store/modules/order';

class ReviewOrderFormContainer extends Component {
  componentDidMount() {
    const { OrderActions } = this.props;
    const { modelName } = this.props;
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

  handlePost = async(e) => {
    const { OrderActions } = this.props;
    const { postForm  } = this.props;
    const { name, phone } = postForm.toJS().customerInfo;
    const makerId = null
    const modelId = this.props.postForm.toJS().model._id;
    let { contents } = this.props.postForm.toJS().model;
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
      
      await OrderActions.postOrder({customerInfo, makerId, modelId, contents, modelImage});
      window.location = await '/customerInfoSuccess/';
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
      console.log(phone)
      console.log(error)
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
    error: state.order.get('error')
  }),
  (dispatch) => ({
    OrderActions: bindActionCreators(orderActions, dispatch)
  })
)(ReviewOrderFormContainer);