import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map, List } from 'immutable';
import * as CouponAPI from '../../lib/api/coupon';

const SET_MESSAGE = 'order/SET_MESSAGE';
const GET_ALL_COUPON = 'coupon/GET_COUPON';
const GET_COUPON_BY_HASH = 'coupon/GET_COUPON_BY_HASH';
const GET_COUPON_BY_REVIEW_ID = 'coupon/GET_COUPON_BY_REVIEW_ID';
const POST_COUPON = 'coupon/POST_COUPON';
const PATCH_COUPON = 'coupon/PATCH_COUPON';

export const setMessage = createAction(SET_MESSAGE);
export const getAllCoupon = createAction(GET_ALL_COUPON, CouponAPI.getAllCoupon);
export const getCouponByHash = createAction(GET_COUPON_BY_HASH, CouponAPI.getCouponByHash);
export const getCouponByReviewId = createAction(GET_COUPON_BY_REVIEW_ID, CouponAPI.getCouponByReviewId);
export const postCoupon = createAction(POST_COUPON, CouponAPI.postCoupon);
export const patchCoupon = createAction(PATCH_COUPON, CouponAPI.patchCoupon);

const initialState = Map({
  allCoupons: List([]),
  couponByHash: Map({}),
  // couponByReviewId: Map({}),
  infoMessage: Map({
    type: '',
    message: ''
  })
})

export default handleActions({
  [SET_MESSAGE]: (state, action) => {
    const { type, message } = action.payload;
    return state.set('infoMessage', Map({type, message}));
  },
  ...pender({
    type: GET_ALL_COUPON,
    onSuccess: (state, action) => state.set('allCoupons', List(action.payload.data))
  }),
  ...pender({
    type: GET_COUPON_BY_HASH,
    onSuccess: (state, action) => {
      return action.payload.data ? state.set('couponByHash', Map(action.payload.data)): state.set('couponByHash', Map({})).set('infoMessage', Map({type:'error',message:'쿠폰이 없습니다'}));
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
      return state.set('couponByHash', Map(action.payload.data));
    },
    onFailure: (state, action) => {  
      return state.set('infoMessage', Map({type:'error',message:'쿠폰 등록 실패'}));
    }
  }),
  ...pender({
    type: PATCH_COUPON,
    onSuccess: (state, action) => {
      return state.setIn(['couponByHash', 'isUsed'], action.payload.data.isUsed)
    }
  }),
}, initialState);