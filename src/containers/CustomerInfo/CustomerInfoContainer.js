import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { CustomerInfoWrapper } from '../../components/CustomerInfo/CustomerInfoWrapper';
import { CustomerInfoInput } from '../../components/CustomerInfo/CustomerInfoInput';
import { CustomerInfoPostButton } from '../../components/CustomerInfo/CustomerInfoPostButton';
import { CustomerInfoError } from '../../components/CustomerInfo/CustomerInfoError';
import * as orderActions from '../../store/modules/order';
import * as orderTemplateActions from '../../store/modules/orderTemplate';
import * as userActions from '../../store/modules/user';

class CustomerInfoContainer extends Component {

  componentDidMount() {
    const { UserActions, OrderTemplateActions } = this.props;
    const { userNumber } = this.props;
    // 회사정보 가져오기
    UserActions.getUserByNum(userNumber);
    OrderTemplateActions.getOrderTemplateByNum(userNumber)
  }

  handleChangeCustomerInfoInput = (e) => {
    const { OrderActions } = this.props;
    const { name, value } = e.target;

    OrderActions.changeCustomerInfoInput({
      name,
      value,
    });
  }

  handleChangeInputView = (button) => {
    const { OrderActions } = this.props;
    OrderActions.changeInputView(button)
  }

  handlePost = async(e) => {
    const { OrderActions } = this.props;
    const { postForm, inputView } = this.props;
    const { name, phone, address } = postForm.toJS().customerInfo;
    const makerId = this.props.loadedUserInfo.get('_id');
    const orderTemplate = this.props.orderTemplate;
    let contents = { template: []};
    orderTemplate.get('template').map(
      (orderList) => {
        contents.template.push({ "label" : orderList, "value": null })
      }
    )

    try {
      if(!this.validate['name'](name)
        ||!this.validate['phone'](phone)
        ||inputView && !this.validate['address'](address)) {
          return
        } 

    let customerInfo = {}
    customerInfo['name'] = name;
    customerInfo['phone'] = phone;
    customerInfo['address'] = address;
    await OrderActions.postOrder({customerInfo, makerId, contents});
    window.location = await '/customerInfoSuccess/';
    } catch(e) {
      OrderActions.setError({ message: "알 수 없는 에러가 발생했습니다."})
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
      if(!phone) {
        const { OrderActions } = this.props;
        OrderActions.setError({ message: "전화번호을 입력하세요."})
        return false;
      }
      return true;
    },
    address: (address) => {
      if(!address) {
        const { OrderActions } = this.props;
        OrderActions.setError({ message: "주소 입력하세요."})
        return false;
      }
      return true;
    }
  }

  render() {
    const customerInfo = this.props.postForm.get('customerInfo')
    const { loadedUserInfo, inputView, error } = this.props;
    const { handleChangeCustomerInfoInput, handleChangeInputView, handlePost } = this;

    return(
      <CustomerInfoWrapper
        companyName={loadedUserInfo.getIn(['company', 'companyName'])}>
        <CustomerInfoInput 
          label="이름"
          name="name"
          inputView={true}
          buttonView={false}
          value={customerInfo.name}
          times={1}
          onChange={handleChangeCustomerInfoInput}
        />
        <CustomerInfoInput 
          label="연락처"
          name="phone"
          inputView={true}
          buttonView={false}
          value={customerInfo.phone}
          times={1}
          onChange={handleChangeCustomerInfoInput}
        />
        <CustomerInfoInput 
          label="주소"
          name="address"
          inputView={inputView}
          buttonView={true}
          onText={"택배로 받기"}
          offText={"방문해서 받기"}
          value={customerInfo.address}
          times={1}
          onChange={handleChangeCustomerInfoInput}
          handleChangeInputView={handleChangeInputView}
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
    inputView: state.order.get('inputView'),
    error: state.order.get('error'),
    loadedUserInfo: state.user.get('loadedUserInfo'),
    orderTemplate: state.orderTemplate
  }),
  (dispatch) => ({
    OrderActions: bindActionCreators(orderActions, dispatch),
    OrderTemplateActions: bindActionCreators(orderTemplateActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(CustomerInfoContainer);

