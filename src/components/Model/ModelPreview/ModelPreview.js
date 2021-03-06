import React, { Component } from 'react';
import './ModelPreview.scss';

class ModelPreview extends Component {

  render() {
    const { postForm } = this.props;
    const { handleChangeModelAddInput, handleChangeModelTemplateInput, handleChangeInfoInput, handlePost } = this.props;

    let templateInputList;
    // 랜더링 직후에는 postForm=undefined이기 때문에
    if(postForm.get('model').size !== 0) {
      templateInputList = postForm.get('model').contents.template.map(
        (content, i) => {
          if(content.label === "모델"){
            return(
              <div key={i}>
                <div className="model-preview-label">{content.label}</div>
                <div className="model-preview-value">{content.value}</div>
              </div>
            )
          }else {
            return(
              <div key={i}>
                <div className="model-preview-label">{content.label}</div>
                <input className="model-preview-input"
                  name={content.label}
                  id={i}
                  value={content.value}
                  onChange={handleChangeModelTemplateInput}
                />
              </div>
            )
          }
        }
      )
    }

    return(
      <div className="model-preview-wrapper">
        <div className="model-preview-left">
        {templateInputList}
        <div>
          <div className="model-preview-label">특이사항</div>
          <input className="model-preview-input"
            name='detail'
            value={postForm.getIn(['addContents', 'detail'])}
            onChange={handleChangeModelAddInput}
          />
        </div>
        </div>
        <div className="model-preview-right">
          <img className="model-preview-img" src={postForm.get('model').modelImage}/>
          <hr className="model-preview-line"/>
          <div style={{fontSize: '20px', fontWeight: 600, color: '#767676'}}>주문하기</div>
          <div className="model-preview-info-input">
            <div className="label">이름</div>
            <input
              name="name"
              value={postForm.getIn(['customerInfo', 'name'])}
              onChange={handleChangeInfoInput}
            />
          </div>
          <div className="model-preview-info-input">
            <div className="label">전화번호</div>
            <input
              name="phone"
              value={postForm.getIn(['customerInfo', 'phone'])}
              onChange={handleChangeInfoInput}
            />
          </div>
          <div className="model-preview-info-input">
            <div className="label">주소</div>
            <input
              name="address"
              value={postForm.getIn(['customerInfo', 'address'])}
              onChange={handleChangeInfoInput}
            />
          </div>
          <div className="model-preview-post-button" onClick={handlePost}>주문하기</div>
        </div>
      </div>
    )
  }
}

export default ModelPreview;