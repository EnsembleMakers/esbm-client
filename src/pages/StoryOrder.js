import React, { Component } from 'react';
import { StoryOrderContainer } from '../containers/StoryOrder';

class StoryOrder extends Component {
  render() {
    const { id } = this.props.match.params;
    return(
      <div>
        <StoryOrderContainer id={id}/>
      </div>
    )
  }
}

export default StoryOrder;