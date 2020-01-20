import React, { Component } from 'react';

import { Route } from 'react-router-dom';
import { ReviewContainer } from '../containers/Review';

class Review extends Component {
  render() {
    const { id } = this.props.match.params;
    return(
      <ReviewContainer orderNumber={id}/>
    )
  }
}

export default Review;