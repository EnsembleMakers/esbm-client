import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ModelWrapper } from '../../components/Model/ModelWrapper';
import { ModelBanner } from '../../components/Model/ModelBanner';
import { ModelPreview } from '../../components/Model/ModelPreview';

import * as userActions from '../../store/modules/user';
import * as modelActions from '../../store/modules/model';
import * as orderActions from '../../store/modules/order';

class ModelContainer extends Component {

  componentDidMount() {
    const { ModelActions, UserActions } = this.props;
    const { userNumber, modelName } = this.props;
    ModelActions.getModelByModelName(modelName);
    UserActions.getUserByNum(userNumber);
  }

  // 일반 input change (detail..)
  handleChangeModelAddInput = (e) => {
    const { ModelActions } = this.props;
    const { name, value } = e.target;
    ModelActions.changeModelAddInput({
      name,
      value,
    });
  }

  // template input change (last, sole, size...)
  handleChangeModelTemplateInput = (e) => {
    const { ModelActions } = this.props;
    const { name, value, id } = e.target;
    ModelActions.changeModelTemplateInput({
      name,
      value,
      id,
    });
  }

  handleChangeInfoInput = (e) => {
    const { ModelActions } = this.props;
    const { name, value } = e.target;

    ModelActions.changeInfoInput({
      name,
      value,
    });
  }

  handlePost = async(e) => {
    const { OrderActions } = this.props;
    const { postForm, history } = this.props;
    const { name, phone, address } = postForm.toJS().customerInfo;
    const makerId = this.props.loadedUserInfo.get('_id');
    let contents = this.props.postForm.toJS().model.contents;
    const modelImage = this.props.postForm.toJS().model.modelImage;

    try {
      // concat addContents + model.contents.template
      contents = Object.assign(contents, postForm.toJS().addContents)

      // customerInfo
      let customerInfo = {}
      customerInfo['name'] = name;
      customerInfo['phone'] = phone;
      customerInfo['address'] = address;
      
      await OrderActions.postOrder({customerInfo, makerId, contents, modelImage});
      window.location = await '/customerInfoSuccess/';
    } catch(e) {
      console.log(e);
    }
  }

  render() {
    const { postForm } = this.props;
    const { handleChangeModelAddInput, handleChangeModelTemplateInput, handleChangeInfoInput, handlePost } = this;
    return(
      <ModelWrapper>
        <ModelBanner/>
        <ModelPreview 
          postForm={postForm}
          handleChangeModelAddInput={handleChangeModelAddInput}
          handleChangeModelTemplateInput={handleChangeModelTemplateInput}
          handleChangeInfoInput={handleChangeInfoInput}
          handlePost={handlePost}
        />
      </ModelWrapper>
    )
  }
}

export default connect(
  (state) => ({
    loadedUserInfo: state.user.get('loadedUserInfo'),
    postForm: state.model.get('postForm')
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch),
    ModelActions: bindActionCreators(modelActions, dispatch),
    OrderActions: bindActionCreators(orderActions, dispatch)
  })
)(ModelContainer);