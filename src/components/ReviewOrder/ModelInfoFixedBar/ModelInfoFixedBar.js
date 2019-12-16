import React, { Component } from 'react';
import styled from 'styled-components';
import { CheckBox } from '../../Modal/CheckBox';
import { FaCheckCircle } from 'react-icons/fa';
import './ModelInfoFixedBar.scss';

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

class ModelInfoFixedBar extends Component {
  render() {
    const { buttonOn, modelById } = this.props;
    const { handleOpenCouponModal } = this.props;
    return(
      <div className="model-info-fixed-bar-wrapper">
        <div className="model-info-fixed-bar-name">{modelById.getIn(['contents', 'spec', 'name'])}</div>
        <img className="model-info-fixed-bar-img" src={modelById.get('modelImage')}/>
        <div className="model-info-fixed-bar-label">가죽소재</div>
        <div className="model-info-fixed-bar-value">{modelById.getIn(['contents', 'spec', 'leather'])}</div>
        <CheckBox
          label={'굽조절'}
          list_1={'가능'}
          list_2={'불가능'}
          value={modelById.getIn(['contents', 'spec', 'heelCustom'])}
          clickable={false}
        />
        <div className="model-info-fixed-bar-label">밑창소재</div>
        <div className="model-info-fixed-bar-value">{modelById.getIn(['contents', 'spec', 'soleMaterial'])}</div>
        <CheckBox
          label={'사전치수측정'}
          list_1={'직접측정'}
          list_2={'측정안함'}
          value={modelById.getIn(['contents', 'spec', 'sizeCustom'])}
          clickable={false}
        />
        <div className="model-info-fixed-bar-label">가격</div>
        <div className="model-info-fixed-bar-value"><b>{modelById.getIn(['contents', 'spec', 'price'])}</b> 원</div>
        {buttonOn && <div className="model-info-fixed-bar-button" onClick={handleOpenCouponModal}>구매티켓 받기</div>}
      </div>

    )
  }
}

export default ModelInfoFixedBar;