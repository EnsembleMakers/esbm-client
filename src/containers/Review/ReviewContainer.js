import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import socketIOClient from "socket.io-client";

import { ReviewEditor } from '../../components/Review/ReviewEditor';
import * as reviewActions from '../../store/modules/review';
import * as orderActions from '../../store/modules/order';

class ReviewContainer extends Component {

  async componentWillReceiveProps(nextProps) {
    if(this.props.loggedInfo !== nextProps.loggedInfo){
      const { orderNumber } = this.props;
      const { ReviewActions, OrderActions } = this.props;

      this.socket = socketIOClient('http://localhost:5000');
      await ReviewActions.getReviewByOrder(orderNumber);
      if ( !this.props.reviewData ) {
        await OrderActions.getOrderByNum(orderNumber)
        // 등록된 model이 있을 경우
        let modelId = this.props.orderById.get('modelId') ? this.props.orderById.get('modelId') : null;
        let data = {
          orderNumber: orderNumber, // Order Collection에서 documentId가 아닌 orderNumber참조 
          userId: nextProps.loggedInfo.get('_id'),
          modelId: modelId,
          rating: -1,
          content: '',
          isCommit: false
        };
        await ReviewActions.postReview(data);
      }
      await ReviewActions.setRoomId(this.props.reviewData.get('_id'));
      await this.socket.emit('join', this.props.roomId);
    }
  }

  handlePost = () => {
      this.socket.emit('commit', this.props.roomId);
      // this.socket.emit('leave', this.props.roomId);
  }

  render() {
    const { handlePost, socket } = this;
    const { roomId, reviewData } = this.props;
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
    orderById: state.order.get('orderById')
  }),
  (dispatch) => ({
    ReviewActions: bindActionCreators(reviewActions, dispatch),
    OrderActions: bindActionCreators(orderActions, dispatch)
  })
)(ReviewContainer);
