import React, { Component, Children } from 'react';
import './ReviewOrderWrapper.scss'

class ReviewOrderWrapper extends Component {
  render() {
    const { instruction, contents, fixedBar } = this.props;
    return(
      <div className="review-order-wrapper">
        <div className="review-order-header"></div>
        <div className="review-order-instruction">{instruction}</div>
        <div className="review-order-contents">{contents}</div>
        <div className="review-order-fixed-bar">{fixedBar}</div>
      </div>
    )
  }
}

export default ReviewOrderWrapper;