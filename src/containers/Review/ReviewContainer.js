import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import socketIOClient from "socket.io-client";

import { ReviewEditor } from '../../components/Review/ReviewEditor';
import * as reviewActions from '../../store/modules/review';

class ReviewContainer extends Component {

  async componentWillReceiveProps(nextProps) {
    if(this.props.loggedInfo !== nextProps.loggedInfo){
      const { orderNumber } = this.props;
      const { ReviewActions } = this.props;

      this.socket = socketIOClient('http://localhost:5000');
      const data = {
        orderId: orderNumber, // Order Collection에서 documentId가 아닌 orderNumber참조 
        userId: nextProps.loggedInfo.get('_id'),
        rating: -1,
        content: ' ',
        isCommit: false
      };
      await ReviewActions.getReviewById(data.orderId);
      if ( this.props.reviewData.get('content').length == 0 ) {
        await ReviewActions.postReview(data);
      }
      ReviewActions.setRoomId(this.props.reviewData.get('_id'));
      this.socket.emit('join', this.props.roomId);
    }
  }

  handlePost = () => {
      this.socket.emit('commit', this.props.roomId);
      // this.socket.emit('leave', this.props.roomId);
  }

  render() {
    const { handlePost, socket } = this;
    const { roomId, reviewData } = this.props;
    // console.log( this.props )
    return(
      <div>
        <ReviewEditor socket={socket} roomId={roomId} reviewData={reviewData}/>
        <div onClick={handlePost}>버튼</div>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    loggedInfo: state.user.get('loggedInfo'),
    reviewData: state.review.get('data'),
    roomId: state.review.get('roomId'),
  }),
  (dispatch) => ({
    ReviewActions: bindActionCreators(reviewActions, dispatch),
  })
)(ReviewContainer);
