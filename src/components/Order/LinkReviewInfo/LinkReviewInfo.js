import React, { Component } from 'react';
import './LinkReviewInfo.scss'

class LinkReviewInfo extends Component {
  render() {
    return(
      <div className="link-review-info-wrapper">
        <div className="link-review-info-title">구매티켓을 발급한 사람</div>
        <div className="link-review-info-content">제목, 내용 등등..</div>
      </div>
    )
  }
}

export default LinkReviewInfo;