import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import socketIOClient from "socket.io-client";

import { ReviewEditor } from '../../components/Review/ReviewEditor';
import * as reviewActions from '../../store/modules/review';

class ReviewContainer extends Component {

  async componentWillReceiveProps(nextProps) {
    if(this.props.loggedInfo !== nextProps.loggedInfo){
      const { ReviewActions } = this.props;

      this.socket = socketIOClient('http://localhost:5000');
      const data = {
        orderId: '1004',
        userId: nextProps.loggedInfo.get('_id'),
        rating: -1,
        content: ' ',
        isCommit: false
      };

      await ReviewActions.postReview(data)
      ReviewActions.setRoomId(this.props.reviewData._id)
      this.socket.emit('join', this.props.roomId);
    }
  }

  handlePost = () => {
    console.log(this.props.reviewData) 
  }

  render() {
    const { handlePost, socket } = this;
    const { roomId, reviewData } = this.props;
    return(
      <div>
        aa<br/>aa<br/>aa<br/>aa<br/>aa<br/>aa<br/>aa<br/>aa<br/>
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
