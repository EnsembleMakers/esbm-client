import React, { Component } from 'react';
import './OrderWrapper.scss';

class OrderWrapper extends Component {
  render() {
    const { children } = this.props;
    const { date } = this.props;
    return(
      <div className="order-wrapper">
        <div className="order-wrapper-header">구매해주셔서 감사합니다.</div>
        <div className="order-wrapper-date"><b>구매 날짜</b> {date}</div>
        {children}
      </div>
    )
  }
}

export default OrderWrapper;