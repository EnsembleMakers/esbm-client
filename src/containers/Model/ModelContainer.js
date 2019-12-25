import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ModelWrapper } from '../../components/Model/ModelWrapper';
import { ModelBanner } from '../../components/Model/ModelBanner';
import { ModelPreview } from '../../components/Model/ModelPreview';

import * as userActions from '../../store/modules/user';
import * as orderActions from '../../store/modules/order';

class ModelContainer extends Component {

  componentDidMount() {
    const { OrderActions, UserActions } = this.props;
    const { userNumber, modelName } = this.props;
    OrderActions.getOrderPostFormByModel(modelName);
    UserActions.getUserByNum(userNumber);
  }

  // 일반 input change (detail..)
  handleChangeModelMainInput = (e) => {
    const { OrderActions } = this.props;
    const { name, value } = e.target;
    OrderActions.changeModelMainInput({
      name,
      value,
    });
  }

  // template input change (last, sole, size...)
  handleChangeModelTemplateInput = (e) => {
    const { OrderActions } = this.props;
    const { name, value, id } = e.target;
    OrderActions.changeModelTemplateInput({
      name,
      value,
      id,
    });
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
    const modelId = this.props.postForm.toJS().model._id;
    let { contents } = this.props.postForm.toJS().model;
    // spec은 삭제하고 order post
    delete contents.spec;
    const modelImage = this.props.postForm.toJS().model.modelImage;

    try {
      if(!this.validate['name'](name)
      ||!this.validate['phone'](phone)
      ||inputView && !this.validate['address'](address)) {
        return
      }

      // customerInfo
      let customerInfo = {}
      customerInfo['name'] = name;
      customerInfo['phone'] = phone;
      customerInfo['address'] = address;
      
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
    const { postForm, inputView, error } = this.props;
    const { handleChangeModelMainInput, handleChangeModelTemplateInput, handleChangeCustomerInfoInput, handleChangeInputView, handlePost } = this;

    return(
      <ModelWrapper>
        <ModelBanner/>
        <ModelPreview 
          postForm={postForm}
          inputView={inputView}
          error={error}
          handleChangeModelMainInput={handleChangeModelMainInput}
          handleChangeModelTemplateInput={handleChangeModelTemplateInput}
          handleChangeCustomerInfoInput={handleChangeCustomerInfoInput}
          handleChangeInputView={handleChangeInputView}
          handlePost={handlePost}
        />
      </ModelWrapper>
    )
  }
}

export default connect(
  (state) => ({
    loadedUserInfo: state.user.get('loadedUserInfo'),
    postForm: state.order.get('postForm'),
    inputView: state.order.get('inputView'),
    error: state.order.get('error')
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch),
    OrderActions: bindActionCreators(orderActions, dispatch)
  })
)(ModelContainer);