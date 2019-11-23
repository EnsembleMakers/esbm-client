import React, { Component } from 'react';
import './ReviewInput.scss';

class ReviewInput extends Component {
  render() {
    const { label, name, value } = this.props;
    const { handleChange } = this.props;
    return(
      <div className="review-input-wrapper">
        <div className="review-input-label">{label}</div>
        <input className="review-input-value" name={name} value={value} onChange={handleChange}/>
      </div>
    )
  }
}

export default ReviewInput;