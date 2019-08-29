import React, { Component } from 'react';
import { OrderManageListItem } from '../OrderManageListItem';
import styled from 'styled-components';
import './OrderManageList.scss';

class OrderManageList extends Component {
  render() {
    const { allOrders, selectedId, view, search } = this.props;
    const { handleGetById, handleChangeOrderSearchInput } = this.props;

    // 전체 order
    const allOrderList = allOrders
    .filter(
      c => c.customerInfo.name.indexOf(search) !== -1
    ).map(
      (order, i) => {
      // 주문상태에 따라 다른 곳에 render
      if(order.state === view)
        return <OrderManageListItem
          key={i}
          id={order._id}
          selectedId={selectedId}
          name={order.customerInfo.name}
          phone={order.customerInfo.phone}
          address={order.customerInfo.address}
          handleGetById={handleGetById}
          />
    })

    return(
      <div className="order-manage-list-wrapper">
        <div className="order-manage-search-bar">
          <div className="search-header">
            <div>검색</div>
            <div style={{fontStyle: "oblique", fontWeight: "600", width: "60%", overflow: "hidden", whiteSpace: "nowrap", textAlign: "center"}}>{search}</div> 
            <div>+</div>
          </div>
          <input className="actions" onChange={handleChangeOrderSearchInput}/>
        </div>
        {allOrderList}
      </div>
    )
  }
}

export default OrderManageList;