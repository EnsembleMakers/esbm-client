import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import throttle from 'lodash/throttle';

class ReviewSeriesContainer extends Component {
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = throttle(() => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;

    const scrollTop =
    (document.documentElement && document.documentElement.scrollTop) ||
    document.body.scrollTop;

    if (scrollHeight - innerHeight - scrollTop < 100) {
      console.log("Almost Bottom Of This Browser");
    }

  }, 450)

  render() {
    return(
      <div>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/></div>
    )
  }
}

export default connect(
  (state) => ({

  }),
  (dispatch) => ({

  })
)(ReviewSeriesContainer);