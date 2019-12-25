import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map, List } from 'immutable';
import * as CouponAPI from '../../lib/api/coupon';

const SET_ERROR = 'order/SET_ERROR';
const GET_ALL_COUPON = 'coupon/GET_COUPON';
const GET_COUPON_BY_HASH = 'coupon/GET_COUPON_BY_HASH';
const GET_COUPON_BY_REVIEW_ID = 'coupon/GET_COUPON_BY_REVIEW_ID';
const POST_COUPON = 'coupon/POST_COUPON';
const PATCH_COUPON = 'coupon/PATCH_COUPON';

export const setError = createAction(SET_ERROR);
export const getAllCoupon = createAction(GET_ALL_COUPON, CouponAPI.getAllCoupon);
export const getCouponByHash = createAction(GET_COUPON_BY_HASH, CouponAPI.getCouponByHash);
export const getCouponByReviewId = createAction(GET_COUPON_BY_REVIEW_ID, CouponAPI.getCouponByReviewId);
export const postCoupon = createAction(POST_COUPON, CouponAPI.postCoupon);
export const patchCoupon = createAction(PATCH_COUPON, CouponAPI.patchCoupon);

const initialState = Map({
  allCoupons: List([]),
  couponByHash: Map({}),
  // couponByReviewId: Map({}),
  error: null
})

export default handleActions({
  [SET_ERROR]: (state, action) => {
    const { message } = action.payload;
    return state.set('error', message);
  },
  ...pender({
    type: GET_ALL_COUPON,
    onSuccess: (state, action) => state.set('allCoupons', List(action.payload.data))
  }),
  ...pender({
    type: GET_COUPON_BY_HASH,
    onSuccess: (state, action) => {
      return action.payload.data ? state.set('couponByHash', Map(action.payload.data)): state.set('couponByHash', Map({}))
    }
  }),
  ...pender({
    type: GET_COUPON_BY_REVIEW_ID,
    onSuccess: (state, action) => {
      return action.payload.data ? state.set('couponByHash', Map(action.payload.data)): state.set('couponByReviewId', Map({}))
    }
  }),
  ...pender({
    type: POST_COUPON,
    onSuccess: (state, action) => {
      return state.set('couponByHash', Map(action.payload.data))
    }
  }),
  ...pender({
    type: PATCH_COUPON,
    onSuccess: (state, action) => {
      return state.setIn(['couponByHash', 'isUsed'], action.payload.data.isUsed)
    }
  }),
}, initialState);