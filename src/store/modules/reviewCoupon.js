import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map, List } from 'immutable';
import * as CouponAPI from '../../lib/api/coupon';

const GET_ALL_COUPON = 'coupon/GET_COUPON';
const GET_COUPON_BY_HASH = 'coupon/GET_COUPON_BY_HASH';
const POST_COUPON = 'coupon/POST_COUPON';

export const getAllCoupon = createAction(GET_ALL_COUPON, CouponAPI.getAllCoupon);
export const getCouponByHash = createAction(GET_COUPON_BY_HASH, CouponAPI.getCouponByHash);
export const postCoupon = createAction(POST_COUPON, CouponAPI.postCoupon);

const initialState = Map({
  allCoupons: List([]),
  couponByHash: Map()
})

export default handleActions({
  ...pender({
    type: GET_ALL_COUPON,
    onSuccess: (state, action) => state.set('allCoupons', List(action.payload.data))
  }),
  ...pender({
    type: GET_COUPON_BY_HASH,
    onSuccess: (state, action) => {
      return state.set('couponByHash', Map(action.payload.data))
    }
  }),
  ...pender({
    type: POST_COUPON,
    onSuccess: (state, action) => {
      return state.set('couponByHash', Map(action.payload.data))
    }
  }),
}, initialState);