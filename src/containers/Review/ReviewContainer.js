import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import socketIOClient from "socket.io-client";

import { ReviewWrapper } from '../../components/Review/ReviewWrapper';
import { ReviewCoverImg } from '../../components/Review/ReviewCoverImg';
import { ReviewInput } from '../../components/Review/ReviewInput';
import { ReviewRating } from '../../components/Review/ReviewRating';
import { ReviewEditor } from '../../components/Review/ReviewEditor';

import * as reviewActions from '../../store/modules/review';
import * as orderActions from '../../store/modules/order';

import { confirmBox } from '../../lib/confirmBox';

class ReviewContainer extends Component {

  async componentWillReceiveProps(nextProps) {
    if(this.props.loggedInfo !== nextProps.loggedInfo){
      const { orderNumber } = this.props;
      const { ReviewActions, OrderActions } = this.props;
      let backend_host = process.env.REACT_APP_BACKEND_HOST;
      
      if (process.env.NODE_ENV === 'production') {
        let url = new URL(backend_host);
        url.port = '';
        backend_host = url.toString();
      }

      //this.socket = socketIOClient(process.env.REACT_APP_BACKEND_HOST, {secure:true});
      this.socket = socketIOClient(backend_host, {secure:true});
      
      await ReviewActions.getReviewByOrder(orderNumber);

      if(this.props.reviewData.size == 0) {
        await OrderActions.getOrderByNum(orderNumber)

        // 등록된 model이 있을 경우
        let modelId = await this.props.orderById.get('modelId') ? this.props.orderById.get('modelId') : null;
        let data = await {
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
      ReviewActions.changeMode('edit');

      if (!this.props.reviewIsCommit) {
        try {
          let coverImgData = this.props.reviewData.get('tempCoverImg');
          let coverImgType = this.props.reviewData.get('coverImgType');
          if (coverImgData) {
            let binaryArray = new Uint8Array(coverImgData.data);
            let binary = '';
            var len = binaryArray.byteLength;
            for (var i = 0; i < len; i++) {
              binary += String.fromCharCode( binaryArray[ i ] );
            }
            // console.log( window.btoa( binary ) );
            coverImgData = window.btoa( binary );
            coverImgData = `data:${coverImgType};base64,${coverImgData}`;  
            ReviewActions.changeCoverImgURL(coverImgData);
          }
        } catch {
          
        }
      } else {
        console.log( 'isCommited' );
        try {
          let coverImgData = this.props.reviewData.get('coverImg');
          if (coverImgData) {
            ReviewActions.changeCoverImgURL(coverImgData);
          }
        } catch {
          
        }
      }
      this.socket.emit('join', this.props.roomId);
    }
  }

  handleChange = async(e) => {
    const { ReviewActions } = this.props;
    const { roomId } = this.props;
    const { name, value } = e.target;
  
    ReviewActions.changeInput({name, value})
    this.socket.emit('add', { roomId, name: name, data: value } );
  }

  handleChangeReviewRating = (rating) => {
    const { ReviewActions } = this.props;
    const { roomId } = this.props;
    ReviewActions.changeRating(rating);
    this.socket.emit('add', { roomId, name: 'rating', data: rating } );
  }

  handleChangeCoverImg = (e) => {
    const { ReviewActions } = this.props;
    const { roomId } = this.props;
    if(e.target.files.length) {
      ReviewActions.changeCoverImg(e.target.files[0]);
      ReviewActions.changeCoverImgType(e.target.files[0].type);
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        ReviewActions.changeCoverImgURL(reader.result);
      }
      this.socket.emit('add', { roomId, name: 'tempCoverImg', data: {type: e.target.files[0].type, base64: e.target.files[0]}})
    }
  }

  handleDeleteCoverImg = (e) => {
    const { roomId } = this.props;
    // Delete Cover Image
  }

  handlePost = async() => {
    const { orderNumber, reviewData } = this.props;
    const { ReviewActions } = this.props;
    
    this.socket.emit('commit', this.props.roomId);
    await ReviewActions.getReviewByOrder(orderNumber);
    await ReviewActions.changeMode('complete');
    window.location = await `/order/${reviewData.get('orderNumber')}`;
  }

  handleChangeMode = async (mode) => {
    const { ReviewActions } = this.props;
    await ReviewActions.changeMode(mode);
  }

  render() {
    const { socket, handleChange, handleChangeCoverImg, handleDeleteCoverImg, handleChangeReviewRating, handlePost, handleChangeMode } = this;
    const { roomId, reviewData, reviewMode } = this.props;

    let ratingData = !reviewData ? '' : reviewData.get('rating');
    let titleData = !reviewData ? '' : reviewData.get('title');

    return(
      <ReviewWrapper>
        <ReviewRating
          label="제품을 평가해주세요!"
          rating={ratingData || ''}
          handleChangeReviewRating={handleChangeReviewRating}
        />
        <ReviewInput 
          label="제품을 소개할 문장을 7글자로 작성하세요!" 
          name='title'
          value={titleData || ''}
          handleChange={handleChange}
        />
        <ReviewCoverImg 
          coverImgURL={reviewData.get('coverImgURL')}
          handleChangeCoverImg={handleChangeCoverImg}
          handleDeleteCoverImg={handleDeleteCoverImg}
        />
        <ReviewEditor 
          socket={socket}
          roomId={roomId}
          reviewData={reviewData}
          reviewMode={reviewMode}
          handleChangeMode={handleChangeMode}
        />
        <div style={{'height': '40px', 'width': '30%', 'margin': '0 auto', 'borderRadius': '5px', 'backgroundColor': '#549dd9', 'color': 'white', 'lineHeight': '40px', 'marginTop': '23px','fontWeight': 600, 'textAlign': 'center', 'cursor': 'pointer'}} onClick={() => confirmBox("리뷰를 저장하시겠습니까?", () => handlePost())}>저장하기</div>
      </ReviewWrapper>
    )
  }
}

export default connect(
  (state) => ({
    loggedInfo: state.user.get('loggedInfo'),
    reviewMode: state.review.get('mode'),
    reviewData: state.review.get('data'),
    reviewIsCommit: state.review.get('data').get('isCommit'),
    roomId: state.review.get('roomId'),
    orderById: state.order.get('orderById')
  }),
  (dispatch) => ({
    ReviewActions: bindActionCreators(reviewActions, dispatch),
    OrderActions: bindActionCreators(orderActions, dispatch)
  })
)(ReviewContainer);
