import React, { Component } from 'react';
import './CustomerInfoWrapper.scss';

class CustomerInfoTable extends Component{
  render() {
  const { children, companyName } = this.props;
    return(
      <div className="customer-info-wrapper">
        <div style={{marginBottom: "8px", fontSize: "15px", color: "#878787", textAlign: "center"}}>휴대폰 번호(SMS 문자)를 통해<br/>구매티켓 발급과 매장을 안내해드립니다.</div>
        <div style={{marginBottom: "15px", fontSize: "12px", color: "#878787", textAlign: "center"}}>개인정보는 앙상블메이커스 한정이벤트 정보활용 이외에는<br/>일체 <b>사용되지 않습니다.</b></div>
        <div className="customer-info-header">{companyName}</div>
        {children}
      </div>
    )
  }
}

export default CustomerInfoTable;
