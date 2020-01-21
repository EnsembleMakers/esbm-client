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
    const { buttonOn, reviewId, modelById } = this.props;
    const { handleOpenCouponModal } = this.props;
    return(
      <div className="model-info-fixed-bar-wrapper">
        <div className="model-info-fixed-bar-name">{modelById.getIn(['contents', 'spec', 'name'])}</div>
        <img className="model-info-fixed-bar-img" src={modelById.get('modelImage')}/>
        <div className="model-info-fixed-bar-label">Leather Material</div>
        <div className="model-info-fixed-bar-value">{modelById.getIn(['contents', 'spec', 'leather'])}</div>
        <CheckBox
          label={'Customizing Heel'}
          list_1={'Possible'}
          list_2={'Not Possible'}
          value={modelById.getIn(['contents', 'spec', 'heelCustom'])}
          clickable={false}
        />
        <CheckBox
          label={'Pre-measurement'}
          list_1={'Yes'}
          list_2={'No'}
          value={modelById.getIn(['contents', 'spec', 'sizeCustom'])}
          clickable={false}
        />
        <div className="model-info-fixed-bar-label">Retail Price</div>
        <div>{modelById.getIn(['contents', 'spec', 'offPrice'])}won</div>    
        {/* {buttonOn && <div className="model-info-fixed-bar-button" onClick={handleOpenCouponModal}>구매티켓 받기</div>} */}
        {buttonOn && <div className="model-info-fixed-bar-button" onClick={() => window.location.href=`/reviewOrderForm/${modelById.getIn(['contents', 'model'])}?rid=${reviewId}`}>Learn More</div>}
      </div>

    )
  }
}

export default ModelInfoFixedBar;