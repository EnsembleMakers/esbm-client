import React, { Component } from 'react';
import { ReviewOrderFormContainer } from '../containers/ReviewOrderForm';

class ReviewOrderForm extends Component {
  render(){
    const { modelName } = this.props.match.params;
    const { location } = this.props;
    return(
      <ReviewOrderFormContainer 
        modelName={modelName}
        location={location}
      />
    )
  }
}

export default ReviewOrderForm;