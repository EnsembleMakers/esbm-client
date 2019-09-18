import { Map } from 'immutable';
import { handleActions, createAction } from 'redux-actions';
import moment from 'moment';

const INIT_DATE = 'calendar/INIT_DATE'
const CHANGE_NEXT_MONTH = 'calendar/CHANGE_NEXT_MONTH';
const CHANGE_PRE_MONTH = 'calendar/CHANGE_PRE_MONTH';
const CHANGE_NEW_DEADLINE = 'calendar/CHANGE_NEW_DEADLINE';

export const initDate = createAction(INIT_DATE);
export const changeNextMonth = createAction(CHANGE_NEXT_MONTH);
export const changePreMonth = createAction(CHANGE_PRE_MONTH);
export const changeNewDeadline = createAction(CHANGE_NEW_DEADLINE);

const initialState = Map({
    today: moment(),
    dateObject: moment(),
    newDeadline: null
});

export default handleActions({
  [INIT_DATE]: (state, action) => {
    return state.set('dateObject', moment())
                .set('newDeadline', null)
  },
  [CHANGE_NEXT_MONTH]: (state, action) => {
    return state.set('dateObject', moment(state.get('dateObject').add(1, 'months')))
  },
  [CHANGE_PRE_MONTH]: (state, action) => {
    return state.set('dateObject', moment(state.get('dateObject').subtract(1, 'months')))
  },
  [CHANGE_NEW_DEADLINE]: (state, action) => {
    return state.set('newDeadline', action.payload.newDeadline)
  }
}, initialState);