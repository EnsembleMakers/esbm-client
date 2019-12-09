import React, { Component } from 'react';
import { CheckBox } from '../../Modal/CheckBox';

import styled from 'styled-components';
import { FaCheckCircle } from 'react-icons/fa';
import './ModelInfo.scss';


class ModelInfo extends Component {
  render() {
    const { orderById } = this.props;
    
    const CheckBoxButton = styled.div`
      width: 40%
      margin-right: 10px;
      color: ${props => props.selected? '#fa6e57' : '#c3c3c3;'}
      height: 35px;
      display: flex;
      align-items: center;
      font-size: 14px;
      cursor: pointer;
    `
    
    return(
      <div className="model-info-wrapper">
        <div className="model-info-title">구매한 제품</div>
        <div className="model-info-img-wrapper">
          <div className="model-info-img">
            <img src={orderById.getIn(['modelId', 'modelImage'])}/>
          </div>
        </div>
        <div className="model-info-content-wrapper">
          <div className="model-info-content-item">
            <div className="label">상품정보</div>
            <div className="value">{orderById.getIn(['modelId', 'contents', 'spec', 'name'])}</div>
          </div>
          <div className="model-info-content-item">
            <div className="label">소재</div>
            <div className="value">{orderById.getIn(['modelId', 'contents', 'spec', 'leather'])}</div>
          </div>
          <div className="model-info-content-item">
            <CheckBox
              label={'굽조절'}
              list_1={'가능'}
              list_2={'불가능'}
              value={orderById.getIn(['modelId', 'contents', 'spec', 'heelCustom'])}
              clickable={false}
            />
          </div>
          <div className="model-info-content-item">
            <div className="label">밑창소재</div>
            <div className="value">{orderById.getIn(['modelId', 'contents', 'spec', 'soleMaterial'])}</div>
          </div>
          <div className="model-info-content-item">
            <CheckBox
              label={'사이즈 측정'}
              list_1={'직접측정'}
              list_2={'측정안함'}
              value={orderById.getIn(['modelId', 'contents', 'spec', 'heelCustom'])}
              clickable={false}
            />
          </div>
          <div className="model-info-content-item">
            <div className="label">가격</div>
            <div className="value">{orderById.getIn(['modelId', 'contents', 'spec', 'price'])}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default ModelInfo;