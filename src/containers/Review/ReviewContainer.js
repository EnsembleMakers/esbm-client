import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import socketIOClient from "socket.io-client";

import { ReviewEditor } from '../../components/Review/ReviewEditor';
import { ReviewWrapper } from '../../components/Review/ReviewWrapper';
import { ReviewInput } from '../../components/Review/ReviewInput';
import { ReviewRating } from '../../components/Review/ReviewRating';
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
          title: '',
          content: '',
          isCommit: false
        };
        await ReviewActions.postReview(data);
      }
      await ReviewActions.setRoomId(this.props.reviewData.get('_id'));
      await ReviewActions.changeMode('edit');
      await this.socket.emit('join', this.props.roomId);
    }
  }

  handleChange = async(e) => {
    const { ReviewActions } = this.props;
    const { roomId } = this.props;
    const { name, value } = e.target;

    ReviewActions.changeInput({name, value})
    this.socket.emit('add', { roomId, name: name, data: value } );
  }

  handlePost = async() => {
    const { orderNumber } = this.props;
    const { ReviewActions } = this.props;
    
    this.socket.emit('commit', this.props.roomId);
    await ReviewActions.getReviewByOrder(orderNumber);
    await ReviewActions.changeMode('complete');
  }

  handleChangeMode = async (mode) => {
    const { ReviewActions } = this.props;
    await ReviewActions.changeMode(mode);
  }

  render() {
    const { socket, handleChange, handlePost, handleChangeMode } = this;
    const { roomId, reviewData, reviewMode } = this.props;
    return(
      <ReviewWrapper>
        <ReviewRating
          label="제품을 평가해주세요!"
        />
        <ReviewInput 
          label="제품을 소개할 문장을 7글자로 작성하세요!" 
          name='title'
          value={reviewData && reviewData.get('title') || ''}
          handleChange={handleChange}
        />
        <ReviewEditor 
          socket={socket}
          roomId={roomId}
          reviewData={reviewData}
          reviewMode={reviewMode}
          handleChangeMode={handleChangeMode}
        />
        <div onClick={handlePost}>버튼</div>
      </ReviewWrapper>
    )
  }
}

export default connect(
  (state) => ({
    loggedInfo: state.user.get('loggedInfo'),
    reviewMode: state.review.get('mode'),
    reviewData: state.review.get('data'),
    roomId: state.review.get('roomId'),
    orderById: state.order.get('orderById')
  }),
  (dispatch) => ({
    ReviewActions: bindActionCreators(reviewActions, dispatch),
    OrderActions: bindActionCreators(orderActions, dispatch)
  })
)(ReviewContainer);
