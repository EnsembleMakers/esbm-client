import React, { Component } from 'react';
import './ReviewRating.scss'

class ReviewRating extends Component {
  render() {
    const { label, rating } = this.props;
    const { handleChangeReviewRating } = this.props;

    // rating star
    let stars = [];
    for(let i = 0; i < 5; i++) {
      let klass = 'review__star';
      if (rating >= i && rating != null) {
        klass += ' is-selected';
      }
      stars.push(
        <label
          key={i}
          className={klass}
          onClick={() => handleChangeReviewRating(i)}
        >★</label>
      );
    }

    return(
      <div className="review-rating-wrapper">
        <div className="review-rating-label">{label}</div>
        <div className="review-rating">{stars}</div>
      </div>
    )
  }
}

export default ReviewRating;