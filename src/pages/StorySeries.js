import React, { Component } from 'react';

import { Route } from 'react-router-dom';
import { StorySeriesContainer } from '../containers/StorySeries';

class StorySeries extends Component {
  render() {
    return(
      <StorySeriesContainer/>
    )
  }
}

export default StorySeries;