import React, { Component } from 'react';
import styled from 'styled-components';

const ImageRailWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 42.33%;
`
const RepImage = styled.img`
  width: 40%;
`
const ExImages = styled.img`
  width: 19%;
  margin-left: 1%;
  height: 45px;
  align-self: flex-end;
  opacity: 0.8;
`

class ImageRail extends Component {
  render() {
    const { images } = this.props;
    
    const exImages = images.slice(1).map(
      (image, i) => <ExImages key={i} src={image}/>
    )
    return(
      <ImageRailWrapper>
        <RepImage src={images[0]}/>
        {exImages}
      </ImageRailWrapper>
    )
  }
}

export default ImageRail