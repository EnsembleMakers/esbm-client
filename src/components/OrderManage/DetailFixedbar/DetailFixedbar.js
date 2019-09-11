import React, { Component } from 'react';
import ReactToPrint from "react-to-print";
import { ShowOrderNum } from '../ShowOrderNum';
import { Print } from '../Print';
import './DetailFixedbar.scss';

import styled from 'styled-components';
import { FaPrint, FaTrashAlt } from 'react-icons/fa';

import { confirmBox } from '../../../lib/confirmBox';

const StateButton = styled.div`
  border: 2px solid ${props => 
    props.state==="ordered" ? "#fa6e57"
    : props.state==="processing" ? "#4695d6"
    : null};
  border-radius: 5px;
  color: ${props => 
    props.state==="ordered" ? "#fa6e57"
    : props.state==="processing" ? "#4695d6"
    : null};
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin: 0 auto;
  margin-top: 10px;
  cursor: pointer;
  

  &:hover {
    background-color: ${props => 
      props.state==="ordered" ? "#fa6e57"
    : props.state==="processing" ? "#4695d6"
    : null};
    color: white;
  }

  // 글자드래그 방지
  -ms-user-select: none; -moz-user-select: -moz-none; -webkit-user-select: none; -khtml-user-select: none; user-select:none;

`

class DetailFixedbar extends Component {
  render() {
    const { imgTextView } = this.props;
    const { state, orderNumber, name, phone, address, date, contents, images, modelImage } = this.props;
    const { handleOpenEditorModal, handleOpenImageModal, handleChangeState, handleChangeImgText, handleDeleteOrder } = this.props;
    return(
      <div className="detail-fixedbar-wrapper">
        <div className="detail-fixedbar">
          <div className="detail-model-image-wrapper">
            {modelImage===null?
            <div className="detail-model-image"/>
            :<img className="detail-model-image" src={modelImage} alt=""/>
            }
          </div>
          <div className="detail-image-wrapper" onClick={handleOpenImageModal} onMouseOver={() => {handleChangeImgText(true)}} onMouseOut={() => {handleChangeImgText(false)}}>
            {images.length===0?
            <div className="detail-image"/>
            :<img className="detail-image" src={images[0]} alt=""/>
            }
            {imgTextView && <div className="detail-image-ref-text">등록된 이미지: <b>{images.length}</b>개 <br/><br/> 이미지를 등록/삭제 하시려면 <b>클릭</b>하세요.</div>}
          </div>
          { // state가 ordered일 때,  주문번호 등록창 보이기
            state==="ordered" ? <ShowOrderNum orderNumber={orderNumber}/> : null}
          { // state가 finished일 때, 등록/수정 버튼과 state 변경 버튼 삭제 
            state==="finished" ? null 
              : <div style={{display:"flex", flexDirection:"row", width:"100%", justifyContent:"space-between"}}>
                  <div className="order-manage-post-button" onClick={handleOpenEditorModal}>작성 및 수정하기
                  </div>
                  <div className="print-button">
                    <ReactToPrint
                      trigger={() => <div><FaPrint/> 인쇄하기</div>}
                      content={() => this.componentRef}
                      pageStyle={"@page { size: auto;  margin: 10mm; }"}
                    />
                    <Print 
                      ref={e => (this.componentRef = e)} 
                      name={name}
                      phone={phone}
                      address={address}
                      orderNumber={orderNumber}
                      date={date}
                      contents={contents}
                      modelImage={modelImage}
                      images={images}
                    />
                  </div>
                </div>}
           { // state에 따라서 다른 버튼 모양
              state==="ordered" ? <StateButton 
              state={state}
              onClick={() => confirmBox("제작중으로 변경하시겠습니까?", () => handleChangeState("processing"))}
              >제작중으로 변경하기</StateButton>
                : state==="processing" ? <StateButton 
              state={state} 
              onClick={() => confirmBox("제작완료로 변경하시겠습니까?", () => handleChangeState("finished"))}
              >제작완료로 변경하기</StateButton>
                : null}
            <div style={{textAlign: 'right', marginTop: '14px'}}>
              <div className="order-delete-button" onClick={() => confirmBox("주문서를 삭제하시겠습니까?", () => handleDeleteOrder())}><FaTrashAlt/>주문서삭제</div>
            </div>
        </div>
      </div>
    )
  }
}

export default DetailFixedbar;
