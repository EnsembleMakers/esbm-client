import React, { Component } from 'react';
import './ReviewWrapper.scss';

class ReviewWrapper extends Component {
  render() {
    const { children } = this.props;
    return(
      <div className="review-wrapper">{children}</div>
    )
  }
}

export default ReviewWrapper;