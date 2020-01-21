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
  width: 33%;
  max-width: 180px;
  height: 50px;
  margin-left: 8px;
  border-radius: 5px;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  background-color: #549dd9; 
  color: white;
  cursor: pointer;
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
    const { buttonOn, reviewId, modelById } = this.props;
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
                  <div className="label">Leather Material</div>
                  <div className="value">{modelById.getIn(['contents', 'spec', 'leather'])}</div>
                </div>
                <div className="model-info-fixed-bottom-detail">
                  <CheckBox
                    label={'Customizing Heel'}
                    list_1={'Possible'}
                    list_2={'Not Possible'}
                    value={modelById.getIn(['contents', 'spec', 'heelCustom'])}
                    clickable={false}
                  />
                </div>
                <div className="model-info-fixed-bottom-detail">
                  <CheckBox
                    label={'Pre-measurement'}
                    list_1={'Yes'}
                    list_2={'No'}
                    value={modelById.getIn(['contents', 'spec', 'sizeCustom'])}
                    clickable={false}
                  />
                </div>
              </div>
            }
            <div className="model-info-fixed-bottom-price">
              <div className="label">Retail Price</div>
              <div>{modelById.getIn(['contents', 'spec', 'offPrice'])}won</div>
            </div>
          </Contents>
          {/* {buttonOn && <CouponButton onClick={handleOpenCouponModal}>구매티켓 받기</CouponButton>} */}
          {buttonOn && <CouponButton onClick={() => window.location.href=`/reviewOrderForm/${modelById.getIn(['contents', 'model'])}?rid=${reviewId}`}>Learn More</CouponButton>}
          
        </Inner>
      </div>
    )
  }
}

export default ModelInfoFixedBottom;