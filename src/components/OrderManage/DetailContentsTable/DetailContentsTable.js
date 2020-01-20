import React, { Component } from 'react';
import './DetailContentsTable.scss';

import { Calendar } from '../../Etc/Calendar';
import { CalendarContainer } from '../../../containers/Etc';
import moment from 'moment';

class DetailContentsTable extends Component {
  render() {
    const { imgTextView } = this.props;
    const { id, address, state, contents, deadline, orderDay, dateObject } = this.props;
    const { handlePatchOrderDeadline } = this.props;

    const templateList = contents.template.map(
      (content, i) => 
        <div key={i} className="detail-contents-row">
          <div className="detail-contents-cell-header">{content.label}</div>
          <div className="detail-contents-cell">{content.value}</div>
        </div>
    )
    
    return(
      <div className="detail-contents-table-wrapper">
        <div className="detail-contents-table">
          <div className="detail-contents-row">
            <div className="detail-contents-cell-header">모델명</div>
            <div className="detail-contents-cell">{contents.model}</div>
          </div>
          {templateList}
        </div>
        <div className="detail-contents-table-line"/>
        <div>
          <div className="detail-contents-row">
            <div className="detail-contents-cell-header">특이사항</div>
          </div>
          <div className="detail-contents-row">  
            <div className="detail-contents-cell">{contents.detail}</div>
          </div>
        </div>
        <div className="detail-contents-table-line"/>
        <div className="detail-contents-row">
          <div className="detail-contents-cell-header">출고날짜</div>
        </div>
        <div className="detail-contents-row">
          <div className="detail-contents-cell">
            <CalendarContainer
              id={id}
              deadline={deadline}
              orderDay={orderDay}
              handlePatchOrderDeadline={handlePatchOrderDeadline}
            />
          </div>
        </div>
        <div className="detail-contents-table-line"/>
        <div className="detail-contents-row">
          <div className="detail-contents-cell-header">가격</div>
        </div>
        <div className="detail-contents-row">
          <div className="detail-contents-cell">가격</div>
        </div>
        <div className="detail-contents-row">
          <div className="detail-contents-cell-header">수령방식</div>
        </div>
        <div className="detail-contents-row">
          <div className="detail-contents-cell">수령방식</div>
        </div>
        <div className="detail-contents-row">
          <div className="detail-contents-cell-header">주소</div>
        </div>
        <div className="detail-contents-row">
          <div className="detail-contents-cell">{address}</div>
        </div>
      </div>
    )
  }
}

export default DetailContentsTable;