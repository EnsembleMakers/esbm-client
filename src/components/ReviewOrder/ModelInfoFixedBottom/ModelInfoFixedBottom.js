import React, { Component } from 'react';
import styled from 'styled-components';
import { FaSleigh } from 'react-icons/fa';

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  border: 1px solid red;
`

class ModelInfoFixedBottom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bottomExpand: false,
    };
  }
  render() {
    console.log(this.state.bottomExpand)
    return(
      <Wrapper>
        aa
        <div onClick={() => this.setState((prevState) => ({bottomExpand: !prevState.bottomExpand}))}>버튼</div>
      </Wrapper>
    )
  }
}

export default ModelInfoFixedBottom;