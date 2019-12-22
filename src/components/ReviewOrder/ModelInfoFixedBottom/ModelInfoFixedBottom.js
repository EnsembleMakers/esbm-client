import React, { Component } from 'react';
import styled from 'styled-components';
import { CheckBox } from '../../Modal/CheckBox';
import { FaSleigh, FaAngleUp, FaAngleDown } from 'react-icons/fa';
import './ModelInfoFixedBottom.scss';
import { device } from '../../../lib/styleUtils';

const Inner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  max-width: 768px;
  margin: 0 auto;
  padding-right: 15px;
  padding-left: 15px;
  padding-top: 5px;
  padding-bottom: 15px;
`

const Contents = styled.div`
  flex-grow: 1;
`

const ExpandButton = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  margin-top: 5px;
  cursor: pointer;
`

const CouponButton = styled.div`
  display: flex;
  width: 180px;
  height: 50px;
  margin-left: 8px;
  border-radius: 5px;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  background-color: #549dd9; 
  color: white;
`

class ModelInfoFixedBottom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bottomExpand: false,
    };
  }

  render() {
    const { bottomExpand } = this.state;
    const { buttonOn, modelById } = this.props;
    const { handleOpenCouponModal } = this.props;
    return(
      <div className="model-info-fixed-bottom-wrapper">
        <ExpandButton onClick={() => this.setState((prevState) => ({bottomExpand: !prevState.bottomExpand}))}>
          { bottomExpand ?
            <FaAngleDown/>:<FaAngleUp/>
          }
        </ExpandButton>
        <Inner>
          <Contents>
        <div className="model-info-fixed-bottom-name">{modelById.getIn(['contents', 'spec', 'name'])}</div>
            {bottomExpand &&
              <div>
                <div className="model-info-fixed-bottom-detail">
                  <div className="label">가죽소재</div>
                  <div className="value">{modelById.getIn(['contents', 'spec', 'leather'])}</div>
                </div>
                <div className="model-info-fixed-bottom-detail">
                  <CheckBox
                    label={'굽조절'}
                    list_1={'가능'}
                    list_2={'불가능'}
                    value={modelById.getIn(['contents', 'spec', 'heelCustom'])}
                    clickable={false}
                  />
                </div>
                <div className="model-info-fixed-bottom-detail">
                  <div className="label">밑창소재</div>
                  <div className="value">{modelById.getIn(['contents', 'spec', 'soleMaterial'])}</div>
                </div>
                <div className="model-info-fixed-bottom-detail">
                  <CheckBox
                    label={'사전치수측정'}
                    list_1={'직접측정'}
                    list_2={'측정안함'}
                    value={modelById.getIn(['contents', 'spec', 'sizeCustom'])}
                    clickable={false}
                  />
                </div>
              </div>
            }
            <div className="model-info-fixed-bottom-price">
              <div className="label">가격</div>
              <div className="value">{modelById.getIn(['contents', 'spec', 'price'])}원</div>
            </div>
          </Contents>
          {buttonOn && <CouponButton onClick={handleOpenCouponModal}>구매티켓 받기</CouponButton>}
        </Inner>
      </div>
    )
  }
}

export default ModelInfoFixedBottom;