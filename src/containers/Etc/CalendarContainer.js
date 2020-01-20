import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Calendar } from '../../components/Etc/Calendar';
import * as calendarActions from '../../store/modules/calendar';
import moment from 'moment';

class CalendarContainer extends Component { 

  // 월 바꾸기
  handleChangeNextMonth = () => {
    const { CalendarActions } = this.props;
    CalendarActions.changeNextMonth()
  }

  handleChangePreMonth = () => {
    const { CalendarActions } = this.props;
    CalendarActions.changePreMonth()
  }

  handleChangeNewDeadline = (newDeadline) => {
    const { CalendarActions } = this.props;
    CalendarActions.changeNewDeadline({
      newDeadline: newDeadline
    })
  }

  handleInitDate = () => {
    const { CalendarActions } = this.props;
    CalendarActions.initDate()
  }

  render() {
    const { id, orderDay, deadline } = this.props;
    const { today, dateObject, newDeadline } = this.props;
    const { handlePatchOrderDeadline } = this.props;
    const { handleChangeNextMonth, handleChangePreMonth, handleChangeNewDeadline, handleInitDate } = this;

    return(
      <Calendar
        id={id}
        orderDay={orderDay}
        deadline={deadline}
        today={today}
        dateObject={dateObject}
        newDeadline={newDeadline}
        handleChangeNextMonth={handleChangeNextMonth}
        handleChangePreMonth={handleChangePreMonth}
        handleChangeNewDeadline={handleChangeNewDeadline}
        handlePatchOrderDeadline={handlePatchOrderDeadline}
        handleInitDate={handleInitDate}
      />
    )
  }
}

export default connect(
  (state) => ({
    today: state.calendar.get('today'),
    dateObject: state.calendar.get('dateObject'),
    newDeadline: state.calendar.get('newDeadline')
  }),
  (dispatch) => ({
    CalendarActions: bindActionCreators(calendarActions, dispatch)
  })
)(CalendarContainer);