import React, { Component } from 'react';
import './ReviewRating.scss'

class ReviewRating extends Component {
  render() {
    const { label } = this.props;
    return(
      <div className="review-rating-wrapper">
        <div className="review-rating-label">{label}</div>
      </div>
    )
  }
}

export default ReviewRating;