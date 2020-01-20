import React, { Component } from "react";
import './Print.scss';

class Print extends Component {
  render() {
    const { name, phone, orderNumber, date, address, contents, modelImage, images } = this.props;

    const numContentsList = contents.length;
    const contentsList = contents.template.map(
      function(content, i) {
        return(
          <div key={i} className="print-contents-row">
            <div className="print-contents-label">{content.label}</div>
            <div className="print-contents-value">{content.value}</div>
          </div>
        )    
      }    
    )

    let imageDivs = [];
    for(let i = 0; i < images.length; i++){
      imageDivs.push(
        <div className="print-page-wrapper">
          <img className="print-full-image" src={images[i]}/>
        </div>
      )
    }

    return(
      <div>
        <div className="print-page-wrapper">
          <div className="print-banner-name">주문서</div>
          <div className="print-header-wrapper">
            <table className="print-header-orders">
              <tbody>
                <tr className="print-header-element"><td>RFID주소</td><td>https://esbmakers.com/order/{orderNumber}</td></tr>
                <tr className="print-header-element"><td>주문자</td><td>{name} 고객님</td></tr>
                <tr className="print-header-element"><td>전화번호</td><td>{phone}</td></tr>
                <tr className="print-header-element"><td>주문번호</td><td>{orderNumber}</td></tr>
                <tr className="print-header-element"><td>주문날짜</td><td>{date}</td></tr>
                <tr className="print-header-element"><td>주소</td><td>{address}</td></tr>
              </tbody>
            </table>
            <div className="print-header-image">
              {images &&
                <img className="print-header-image-cropped" src={modelImage}/>
              }
            </div>
          </div>
          <div className="order-table-wrapper">
            <div className="order-table-view">
              <div className="print-contents-row">
                <div className="print-contents-label">모델명</div>
                <div className="print-contents-value">{contents.model}</div>
              </div>
              {contentsList}
            </div>
            <div className="order-table-view">
              <div className="print-contents-label" style={{width: "100%"}}>특이사항</div>
              <div className="print-contents-value" style={{width: "100%"}}>{contents.detail}</div>
            </div>
          </div>
        </div>
        {imageDivs}
      </div>
    )
  }
}

export default Print;
