import React, { Component } from 'react';
import styled from 'styled-components'

import { device } from '../lib/styleUtils';

const Content = styled.div`
  text-align: center;

  @media ${device.phone} { 
    padding-top: 10rem;
    font-size: 1.2rem;
  }
  @media ${device.tablet} { 
    padding-top: 8rem;
    font-size: 1.8rem;
  }
  @media ${device.desktop} { 
    padding-top: 8rem;
    font-size: 1.8rem;
  }

`

class CustomerInfoSuccess extends Component {
  render(){
    return(
      <div>
        <Content>주문해주셔서 감사합니다!</Content>
        <div style={{marginTop: "25px", fontSize: "16px", color: "#878787", textAlign: "center"}}><b>2시간</b> 이내로 <br/>작성해주신 핸드폰 번호(SMS 문자)를 통해 <br/><b>구매티켓</b> 발급과 <b>매장안내</b>를 도와 드리겠습니다.</div>
        <div style={{marginTop: "50px", color: "#878787", textAlign: "center"}}>영업시간 종료시간 및 공휴일에는<br/>문자발송이 늦어질 수 있습니다.</div>
      </div>
    )
  }
}

export default CustomerInfoSuccess;
