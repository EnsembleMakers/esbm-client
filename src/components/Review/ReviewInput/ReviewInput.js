import React, { Component } from 'react';
import './ReviewInput.scss';

class ReviewInput extends Component {
  render() {
    const { label, name } = this.props;
    let { value } = this.props;
    const { handleChange } = this.props;
    
    if (name == "title" && value.length>7) {
      value = value.substr(0, 7)
    }

    return(
      <div className="review-input-wrapper">
        <div className="review-input-label">{label}</div>
        <input className="review-input-value" name={name} value={value} onChange={handleChange}/>
        <div style={{color: '#767676', fontSize: '13px', fontWeight: '600', marginBottom: '5px'}}>ex) 하늘을나는기분, 매너메이키스맨, 기본중에서기본 </div>
      </div>
    )
  }
}

export default ReviewInput;