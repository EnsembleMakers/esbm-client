import React, { Component } from 'react';
import { ReviewOrderContainer } from '../containers/ReviewOrder';

class ReviewOrder extends Component {
  render() {
    const { id } = this.props.match.params;
    return(
      <ReviewOrderContainer id={id}/>
    )
  }
}

export default ReviewOrder;