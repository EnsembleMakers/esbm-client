import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import socketIOClient from "socket.io-client";

import { ReviewEditor } from '../../components/Review/ReviewEditor';
import * as reviewActions from '../../store/modules/review';

class ReviewContainer extends Component {

  handlePost = () => {
    console.log('aa')
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.loggedInfo !== nextProps.loggedInfo){
      this.socket = socketIOClient('http://localhost:5000');
      const { ReviewActions } = this.props;
      console.log( nextProps.loggedInfo.get('_id') );
      const data = {
        orderId: '1004',
        userId: nextProps.loggedInfo.get('_id'),
        rating: -1,
        content: ' ',
        isCommit: false
      };
      ReviewActions.postReview(data).then( (res) => { 
        this.setState({
          roomId: res.data._id
        });
        console.log( res.data._id );
        this.socket.emit('join', this.state.roomId);
      });
    }
  }

  componentWillMount() {
  }

  componentDidMount() {
    
  }

  render() {
    const { handlePost, socket } = this;
    const { roomId } = this.state;
    if ( roomId !== null ) {
      console.log( roomId );
    }
    return(
      <div>
        aa<br/>aa<br/>aa<br/>aa<br/>aa<br/>aa<br/>aa<br/>aa<br/>
        <ReviewEditor socket={socket} />
        <div onClick={handlePost}>버튼</div>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    review: state.review.get('data'),
    loggedInfo: state.user.get('loggedInfo')
  }),
  (dispatch) => ({
    ReviewActions: bindActionCreators(reviewActions, dispatch),
  })
)(ReviewContainer);
