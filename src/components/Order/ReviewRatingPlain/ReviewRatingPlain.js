import React, { Component } from 'react';
import { FaStar } from 'react-icons/fa';
import './ReviewRatingPlain.scss';

class ReviewRatingPlain extends Component {
  render() {
    const { rating } = this.props;

    // rating star
    let stars = [];
    for(let i = 0; i < 5; i++) {
      let klass = 'review-plain__star';
      if (rating >= i && rating != null) {
        klass += ' is-selected';
      }
      stars.push(
        <label
          key={i}
          className={klass}
        ><FaStar/></label>
      );
    }

    return(
      <div className="review-rating-plain-wrapper">
        <div className="review-rating-plain">{stars}</div>
      </div>
    )
  }
}

export default ReviewRatingPlain;