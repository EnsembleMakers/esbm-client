import React, { Component } from 'react';
import './MakerInfo.scss';

import MdPhonePortrait from 'react-ionicons/lib/MdPhonePortrait';
import MdHome from 'react-ionicons/lib/MdHome';

class MakerInfo extends Component {
  render() {
    return(
      <div className="maker-info-wrapper">
        <div className="maker-info-title">제작자 정보</div>
        <div className="maker-info-content-wrapper">주소 전화번호 AS안내 다른상품보기
        </div>
      </div>
    )
  }
}

export default MakerInfo;