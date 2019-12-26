import React, { Component } from 'react';
import styled from 'styled-components';
import Lottie from 'react-lottie';

import successAnim from '../../../lotties/782-check-mark-success.json';
import errorAnim from '../../../lotties/10960-error.json';
import { device } from '../../../lib/styleUtils';

const Content = styled.div`
  text-align: center;

  @media ${device.phone} { 
    // padding-top: 10rem;
    font-size: 1.2rem;
  }
  @media ${device.tablet} { 
    // padding-top: 8rem;
    font-size: 1.8rem;
  }
  @media ${device.desktop} { 
    // padding-top: 8rem;
    font-size: 1.8rem;
  }

`

class ReviewCouponInfo extends Component {
  render(){
    const defaultOptions = {
      loop: false,
      autoplay: true, 
      animationData: successAnim,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };
    const { type, message } = this.props;
    if (type === 'error') defaultOptions.animationData = errorAnim;
    return(
      <div>
        { type !== '' &&
          <Lottie options={defaultOptions}
            height={400}
            width={400}
          />
        }
        <Content>{message}</Content>
      </div>
    )
  }
}

export default ReviewCouponInfo;