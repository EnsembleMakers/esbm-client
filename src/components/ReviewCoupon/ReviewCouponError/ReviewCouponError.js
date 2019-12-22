import React, { Component } from 'react';
import styled from 'styled-components'

import { device } from '../../../lib/styleUtils';

const Content = styled.div`
  text-align: center;

  @media ${device.phone} { 
    padding-top: 10rem;
    font-size: 1.2rem;
  }
  @media ${device.tablet} { 
    padding-top: 8rem;
    font-size: 1.8rem;
  }
  @media ${device.desktop} { 
    padding-top: 8rem;
    font-size: 1.8rem;
  }

`

class ReviewCouponError extends Component {
  render(){
    const { children } = this.props;
    return(
      <div>
        <Content>{children}</Content>
      </div>
    )
  }
}

export default ReviewCouponError;