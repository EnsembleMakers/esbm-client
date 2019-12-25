import React, { Component } from 'react';
import { ReviewOrderFormContainer } from '../containers/ReviewOrderForm';

class ReviewOrderForm extends Component {
  render(){
    const { modelName } = this.props.match.params;
    return(
      <ReviewOrderFormContainer modelName={modelName}/>
      
    )
  }
}

export default ReviewOrderForm;