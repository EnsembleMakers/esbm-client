import React, { Component } from 'react';
import './ReviewViewer.scss'

class ReviewViewer extends Component {
  render() {
    const { content } = this.props;
    return(
      <div className="review-viewer-content" dangerouslySetInnerHTML={ {__html: content} }/>
    )
  }
}

export default ReviewViewer;