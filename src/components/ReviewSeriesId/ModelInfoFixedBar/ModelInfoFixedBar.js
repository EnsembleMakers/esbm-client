import React, { Component } from 'react';
import './ModelInfoFixedBar.scss';

class ModelInfoFixedBar extends Component {
  render() {
    const { buttonOn } = this.props;
    return(
      <div className="model-info-fixed-bar-wrapper">
        <div className="model-info-fixed-bar-name">Z304 모델</div>
        <img className="model-info-fixed-bar-img" src="/img/5dc562b86bace30467a1c5dc/56ea15ec-896d-4093-99b8-09f4f19edc7e.jpeg"/>
        <div className="model-info-fixed-bar-label">소재</div>
        <div className="model-info-fixed-bar-value">소가죽</div>
        <div className="model-info-fixed-bar-label">굽</div>
        <div className="model-info-fixed-bar-value">고무창 (미끄럼방지)</div>
        <div className="model-info-fixed-bar-label">굽높이</div>
        <div className="model-info-fixed-bar-value">기본 3cm (조절가능)</div>
        <div className="model-info-fixed-bar-label">사전치수측정</div>
        <div className="model-info-fixed-bar-value">맞춤</div>
        <div className="model-info-fixed-bar-label">가격</div>
        <div className="model-info-fixed-bar-value"><b>210,000</b> 원</div>
        {buttonOn && <div className="model-info-fixed-bar-button">구매티켓 받기</div>}
      </div>

    )
  }
}

export default ModelInfoFixedBar;