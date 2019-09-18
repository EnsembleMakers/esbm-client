import React, { Component } from 'react';
import moment from 'moment';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

import './Calendar.scss';
import { object } from 'prop-types';

let days = ['일', '월', '화', '수', '목', '금', '토']

class Calendar extends Component {

  // 해당 월에 시작되는 날의 위치
  firstDayOfMonth = () => {
    let dateObject = this.props.dateObject;
    let firstDay = moment(dateObject)
                .startOf("month")
                .format("d");
    return firstDay;
  }
  // 해당 월이 가지고 있는 날의 개수
  daysInMonth = () => {
    return this.props.dateObject.daysInMonth();
  }
  // 오늘
  currentDay = () => {
    return this.props.today.format('YYYY-MM-D')
  }

  render() {
    const { id, orderDay, deadline, today, newDeadline } = this.props;
    const { handleChangeNextMonth, handleChangePreMonth, handleChangeNewDeadline, handlePatchOrderDeadline, handleInitDate } = this.props;

    // 월화수목금토일 표시
    let daysLabel = days.map((day, i) => {
      return <th key={i}>{day}</th>
    })
    // 월 단위 날짜 셀
    let blanks = [];
    let daysInMonth = [];

    for(let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(<td key={i - this.firstDayOfMonth() + 1} className="calendar-day empty">{""}</td>)
    }

    for(let i = 1; i <= this.daysInMonth(); i++) {
      // today 블럭표시
      let dateObject = this.props.dateObject.format('YYYY-MM-')+i ;
      // 데드라인 블럭표시
      let objectToOrderDay = moment(dateObject, 'YYYY-MM-D').diff(moment(orderDay).format('YYYY-MM-D'), 'days')

      let currentDay;
      if(dateObject == this.currentDay()){
        currentDay = "today"
      } else if(objectToOrderDay <= deadline && objectToOrderDay >= 0 && newDeadline == null) {
        currentDay = "deadline";
      } else if(objectToOrderDay <= newDeadline && objectToOrderDay >= 0){
        currentDay = "new-deadline";
      } else {
        currentDay = "";
      }
      
      daysInMonth.push(<td key={i} className={`calendar-day ${currentDay}`}>{i}</td>)
    }

    // 일주일(7개) 단위로 자르기
    const totalSlots = [...blanks, ...daysInMonth]
    let rows = [];
    let cells = [];
    totalSlots.forEach((row, i) => {
      if(i%7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = []; //initialize
        cells.push(row);
      }
      // last week
      if(i === totalSlots.length-1) {
        rows.push(cells)
      }
    })
    let splitDays = rows.map((d, i) => {
      return <tr key={i}>{d}</tr>
    })

    // select box
    let selectBox = []
    selectBox.push(<option key={0} value={0} disabled hidden>기간선택</option>)
    for(let i=1; i<31; i++) {
      selectBox.push(<option key={i} value={i}>{`${i}일`}</option>)
    }
    
    return(
      <div>
        <div className="calendar-controll-wrapper">
        <select className="calendar-controll-wrapper select-box" value={newDeadline||deadline} onChange={(e) => handleChangeNewDeadline(e.target.value)}>
          {selectBox}
        </select>
        { newDeadline &&
        <div className="calendar-controll-wrapper button">
          <div className="calendar-save-button" onClick={() => handlePatchOrderDeadline(id, newDeadline)}>저장
          </div>
          <div className="calendar-cancel-button" onClick={handleInitDate}>취소
          </div>
        </div>
        }
        </div>
        <div className="calendar-wrapper">  
          <div className="calendar-header">
            <div style={{width: "50%"}}>{moment(orderDay).format('YYYY-MM-DD')}</div>
            <div>~</div>
            <div style={{width: "50%"}}>{moment(orderDay).add(newDeadline||deadline, 'days').format('YYYY-MM-DD')}</div>
          </div>
          <div className="calendar-navi">
            <div className="calendar-arrow-button" onClick={handleChangePreMonth}><FaArrowLeft/></div>
            <div style={{fontWeight: 'bold'}}>{this.props.dateObject.format('M')}월</div>
            <div className="calendar-arrow-button" onClick={handleChangeNextMonth}><FaArrowRight/></div>
          </div>
          <table className="calendar-table">
            <thead>
              <tr>{daysLabel}</tr>
            </thead>
            <tbody>{splitDays}</tbody>
          </table>
        </div>
      </div>
    )
  }

}

export default Calendar;