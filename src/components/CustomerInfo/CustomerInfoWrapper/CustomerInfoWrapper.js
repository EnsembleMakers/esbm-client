import React, { Component } from 'react';
import './CustomerInfoWrapper.scss';

class CustomerInfoTable extends Component{
  render() {
  const { children, companyName } = this.props;
    return(
      <div className="customer-info-wrapper">
        <div className="customer-info-header"><b>{companyName}</b></div>
        {children}
      </div>
    )
  }
}

export default CustomerInfoTable;