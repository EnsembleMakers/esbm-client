import React, { Component } from 'react';

class ReviewOrderContainer extends Component {
  render() {
    const { id } = this.props;
    return(
      <div>{id}<br/>{id}<br/>{id}<br/>{id}<br/>{id}<br/>{id}<br/>{id}<br/>{id}<br/>{id}<br/></div>
    )
  }
}

export default ReviewOrderContainer;