import React, { Component } from 'react';
import moment from 'moment';

import './Calendar.scss';
import { object } from 'prop-types';

let days = ['일', '월', '화', '수', '목', '금', '토']

class Calendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      today: moment(),
      selectedDay: '',
      dateObject: moment(),
      deadline: 5,
      newDeadline: null,
    }
  }

  // 해당 월에 시작되는 날의 위치
  firstDayOfMonth = () => {
    let dateObject = this.state.dateObject;
    let firstDay = moment(dateObject)
                .startOf("month")
                .format("d");
    return firstDay;
  }
  // 해당 월이 가지고 있는 날의 개수
  daysInMonth = () => {
    return this.state.dateObject.daysInMonth();
  }
  // 오늘
  currentDay = () => {
    return this.state.today.format('YYYY-MM-D')
  }
  // 데드라인에 포함된 날짜
  deadline = () => {
    console.log(this.state.deadline)
    console.log(this.state.today.add('days', this.state.deadline))
  }
  // 월 바꾸기
  nextMonth = () => {
    return this.setState({
      dateObject: moment(this.state.dateObject).add(1, 'months')
    })
  }
  preMonth = () => {
    return this.setState({
      dateObject: moment(this.state.dateObject).subtract(1, 'months')
    })
  }

  // 현재 사용 x
  // // 날짜 선택
  // selectDay = (day) => {
  //   return this.setState({
  //     // moment(해당날짜, format지정)
  //     selectedDay: moment(this.state.dateObject.format('YYYY-MM-')+day, 'YYYY-MM-D')
  //   })
  // }

  render() {
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
      let dateObject = this.state.dateObject.format('YYYY-MM-')+i ;

      // 데드라인 블럭표시
      let objectToToday = moment(dateObject, 'YYYY-MM-D').diff(this.state.today.format('YYYY-MM-D'), 'days')

      let currentDay;
      if(dateObject == this.currentDay()){
        currentDay = "today"
      } else if(objectToToday <= 5 && objectToToday > 0) {
        currentDay = "deadline";
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
    for(let i=1; i<31; i++) {
      selectBox.push(<option key={i} value={i}>{`${i}일 후`}</option>)
    }

    return(
      <div>
        <select className="calendar-select-box" onChange={(e) => console.log(e.target.value)}>
          {selectBox}
        </select>
        <div className="calendar-wrapper">  
          <div className="calendar-header">
            <div style={{width: "50%"}}>s</div>
            <div style={{width: "50%"}}>s</div>
          </div>
          <div className="calendar-navi">
            <div onClick={this.preMonth}>{`<`}</div>
            <div onClick={this.nextMonth}>{`>`}</div>
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