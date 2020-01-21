import React, { Component } from 'react';
import './ReviewOrderWrapper.scss'

class ReviewOrderWrapper extends Component {
  render() {
    const { instruction, contents, fixedBar, fixedBottom } = this.props;
    return(
      <div>
        <div className="review-order-wrapper">
          <div style={{'fontSize': '28px', 'fontWeight': 700, 'color': '#484848', 'textAlign': 'left', 'marginBottom': '20px', 'width': '100%'}}>Product Info</div>
          <div className="review-order-instruction">{instruction}</div>
          <div style={{'fontSize': '28px', 'fontWeight': 700, 'color': '#484848', 'textAlign': 'left', 'marginBottom': '20px', 'width': '100%'}}>Product Story</div>
          <div className="review-order-review-viewer">{contents}</div>
          <div className="review-order-fixed-bar">{fixedBar}</div>
        </div>
        <div className="review-order-fixed-bottom">{fixedBottom}</div>
      </div>
    )
  }
}

export default ReviewOrderWrapper;