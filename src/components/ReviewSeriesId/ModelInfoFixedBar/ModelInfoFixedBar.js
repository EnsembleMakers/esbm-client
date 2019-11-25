import React, { Component } from 'react';
import styled from 'styled-components';
import { FaCheckCircle } from 'react-icons/fa';
import './ModelInfoFixedBar.scss';

const CheckBoxButton = styled.div`
  width: 40%
  margin-right: 10px;
  color: ${props => props.selected? '#fa6e57' : '#c3c3c3;'}
  height: 35px;
  display: flex;
  align-items: center;
  font-size: 18px;
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
        <div className="model-info-fixed-bar-label">굽조절</div>
        <div className="model-info-fixed-bar-value" style={{display: 'flex',
  flexDirection: 'row', marginTop: '5px'}}><CheckBoxButton
            selected={modelById.getIn(['contents', 'spec', 'heelCustom'])==1}
          ><FaCheckCircle style={{marginRight: '10px'}}/>가능</CheckBoxButton>
          <CheckBoxButton
            selected={modelById.getIn(['contents', 'spec', 'heelCustom'])==2}
          ><FaCheckCircle style={{marginRight: '10px'}}/>불가능</CheckBoxButton></div>
        <div className="model-info-fixed-bar-label">밑창소재</div>
        <div className="model-info-fixed-bar-value">{modelById.getIn(['contents', 'spec', 'soleMaterial'])}</div>
        <div className="model-info-fixed-bar-label">사전치수측정</div>
        <div className="model-info-fixed-bar-value" style={{display: 'flex',
  flexDirection: 'row', marginTop: '5px'}}><CheckBoxButton
            selected={modelById.getIn(['contents', 'spec', 'sizeCustom'])==1}
          ><FaCheckCircle style={{marginRight: '10px'}}/>직접측정</CheckBoxButton>
          <CheckBoxButton
            selected={modelById.getIn(['contents', 'spec', 'sizeCustom'])==2}
          ><FaCheckCircle style={{marginRight: '10px'}}/>측정안함</CheckBoxButton></div>
        <div className="model-info-fixed-bar-label">가격</div>
        <div className="model-info-fixed-bar-value"><b>{modelById.getIn(['contents', 'spec', 'price'])}</b> 원</div>
        {buttonOn && <div className="model-info-fixed-bar-button" onClick={handleOpenCouponModal}>구매티켓 받기</div>}
      </div>

    )
  }
}

export default ModelInfoFixedBar;