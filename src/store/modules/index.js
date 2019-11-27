import { combineReducers } from 'redux';
import base from './base';
import auth from './auth';
import user from './user';
import order from './order';
import orderTemplate from './orderTemplate';
import model from './model';
import modal from './modal';
import review from './review';
// import reviewCoupon from './reviewCoupon';
import search from './search';
import calendar from './calendar';
import { penderReducer } from 'redux-pender';
import { sessionReducer } from 'redux-react-session';

export default combineReducers({
    base,
    auth,
    user,
    order,
    orderTemplate,
    model,
    modal,
    review,
    // coupon: reviewCoupon,
    search,
    calendar,
    pender: penderReducer,
    session: sessionReducer
});