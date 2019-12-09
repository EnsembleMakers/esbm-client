import React, { Component } from 'react';
import './MyReview.scss';

class MyReview extends Component {
  render() {
    const { reviewData } = this.props;

    return(
      <div className="my-review-wrapper">
        <div className="my-review-title">작성한 리뷰</div>
        <div className="my-review-img-wrapper">
          <div className="my-review-img">
            <img src="https://post-phinf.pstatic.net/MjAxOTAzMDVfMTA2/MDAxNTUxNzE0NTgzNjk0.PzseU8-FCZ1Jrv2qVq2AwDvtwPD_fs1E4p5Bzt4FnTsg.SyavWlbmxrCTyO1nJCRsIo6HOMNEwGRiovt6KRZqJZsg.JPEG/%EB%82%A8%EC%9E%90%EC%88%98%EC%A0%9C%ED%99%94_%EB%B8%8C%EB%9E%9C%EB%93%9C_%EC%B6%94%EC%B2%9C_%EB%B0%94%EB%82%98%EB%82%98%ED%95%8F_%EC%95%95%EB%8F%84%EC%A0%81%EC%9D%B4%EC%95%BC_%283%29.jpg?type=w1200"/>
          </div>
        </div>
        <div className="my-review-content-wrapper">
          <div className="rating">{reviewData.get('rating')}</div>
          <div className="auth">작성자</div>
          <div className="date">{reviewData.get('createdAt')}</div>
          <div className="title">{reviewData.get('title')}</div>
        </div>
      </div>
    )
  }
}

export default MyReview;