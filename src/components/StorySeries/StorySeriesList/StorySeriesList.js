import React, { Component } from 'react';
import { StorySeriesItem } from '../StorySeriesItem';
import './StorySeriesList.scss';

class StorySeriesList extends Component {
  render() {
    const { reviewSeries } = this.props;
    const reviewSeriesList = reviewSeries
      .map(
        (reviewData, i) =>
          <StorySeriesItem 
            key={i}
            reviewData={reviewData}
          />
      )

    return(
      <div className="review-series-list-wrapper">
        <div className="review-series-list-header">Story and Experience</div>
        {/* <div style={{'fontSize': '25px', 'color': '#484848', 'fontWeight': 700, 'paddingBottom': '15px'}}>성수동</div> */}
        <div className="review-series-list">{reviewSeriesList}</div>
      </div>
    )
  }
}

export default StorySeriesList;
