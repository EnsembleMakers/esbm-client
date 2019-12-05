import React, { Component } from 'react';
import './ModelInfo.scss';

class ModelInfo extends Component {
  render() {
    return(
      <div className="model-info-wrapper">
        <div className="model-info-title">구매한 제품</div>
        <div className="model-info-img-wrapper">
          <div className="model-info-img">
            <img src="https://post-phinf.pstatic.net/MjAxOTAzMDVfMTA2/MDAxNTUxNzE0NTgzNjk0.PzseU8-FCZ1Jrv2qVq2AwDvtwPD_fs1E4p5Bzt4FnTsg.SyavWlbmxrCTyO1nJCRsIo6HOMNEwGRiovt6KRZqJZsg.JPEG/%EB%82%A8%EC%9E%90%EC%88%98%EC%A0%9C%ED%99%94_%EB%B8%8C%EB%9E%9C%EB%93%9C_%EC%B6%94%EC%B2%9C_%EB%B0%94%EB%82%98%EB%82%98%ED%95%8F_%EC%95%95%EB%8F%84%EC%A0%81%EC%9D%B4%EC%95%BC_%283%29.jpg?type=w1200"/>
          </div>
        </div>
        <div className="model-info-content-wrapper">
          <div className="model-info-content-item">첫번쨰</div>
          <div className="model-info-content-item">두번쨰</div>
          <div className="model-info-content-item">세번쨰</div>
        </div>
      </div>
    )
  }
}

export default ModelInfo;