import React, { Component } from 'react';
import { ReviewOrderContainer } from '../containers/ReviewOrder';
import { CouponModalContainer } from '../containers/CouponModal';

class ReviewOrder extends Component {
  render() {
    const { id } = this.props.match.params;
    return(
      <div>
        <ReviewOrderContainer id={id}/>
        <CouponModalContainer id={id}/>
      </div>
    )
  }
}

export default ReviewOrder;