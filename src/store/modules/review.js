import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map, List } from 'immutable';
import * as ReviewAPI from '../../lib/api/review';

const CHANGE_MODE = 'review/CHANGE_MODE';
const CHANGE_INPUT = 'review/CHANGE_INPUT';
const CHANGE_COVER_IMG = 'review/CHANGE_COVER_IMG';
const CHANGE_COVER_IMG_TYPE = 'review/CHANGE_COVER_IMG_TYPE';
const CHANGE_COVER_IMG_URL = 'review/CHANGE_COVER_IMG_URL';
const CHANGE_RATING = 'review/CHANGE_RATING';
const SET_ROOM_ID = 'review/SET_ROOM_ID';
const GET_REVIEW_BY_ID = 'review/GET_REVIEW_BY_ID'
const GET_REVIEW_BY_ORDER = 'review/GET_REVIEW_BY_ORDER';
const GET_REIVEW_SERIES = 'review/GET_REVIEW_SERIES';
const POST_REVIEW = 'review/POST_REVIEW';
const PATCH_REVIEW = 'review/PATCH_REVIEW';

export const changeMode = createAction(CHANGE_MODE);
export const changeInput = createAction(CHANGE_INPUT);
export const changeCoverImg = createAction(CHANGE_COVER_IMG);
export const changeCoverImgType = createAction(CHANGE_COVER_IMG_TYPE);
export const changeCoverImgURL = createAction(CHANGE_COVER_IMG_URL);
export const changeRating = createAction(CHANGE_RATING);
export const setRoomId = createAction(SET_ROOM_ID);
export const getReviewById = createAction(GET_REVIEW_BY_ID, ReviewAPI.getReviewById);
export const getReviewByOrder = createAction(GET_REVIEW_BY_ORDER, ReviewAPI.getReviewByOrder);
export const getReviewSeries = createAction(GET_REIVEW_SERIES, ReviewAPI.getReviewSeries);
export const postReview = createAction(POST_REVIEW, ReviewAPI.postReview);
export const patchReview = createAction(PATCH_REVIEW, ReviewAPI.patchReview);

const initialState = Map({
  mode: 'read',
  data: Map({}),
  roomId: '',
  reviewById: Map({}),
  reviewSeries: List(),
  lastSeries: false,
})

export default handleActions({
  [CHANGE_MODE]: (state, action) => {
    return state.set('mode', action.payload);
  },
  [CHANGE_INPUT]: (state, action) => {
    const { name, value } = action.payload;
    return state.setIn(['data', name], value);
  },
  [CHANGE_COVER_IMG]: (state, action) => {
    return state.setIn(['data', 'coverImg'], action.payload)
  },
  [CHANGE_COVER_IMG_TYPE]: (state, action) => {
    return state.setIn(['data', 'coverImgType'], action.payload)
  },
  [CHANGE_COVER_IMG_URL]: (state, action) => {
    return state.setIn(['data', 'coverImgURL'], action.payload)
  },
  [CHANGE_RATING]: (state, action) => {
    return state.setIn(['data', 'rating'], action.payload);
  },
  [SET_ROOM_ID]: (state, action) => {
    return state.set('roomId', action.payload)
  },
  ...pender({
    type: GET_REVIEW_BY_ID,
    onSuccess: (state, action) => {
      return state.set('reviewById', Map(action.payload.data))
    }
  }),
  ...pender({
    type: GET_REVIEW_BY_ORDER,
    onSuccess: (state, action) => {
      return action.payload.data ? state.set('data', Map(action.payload.data)): state.set('data', Map({}))
    }
  }),
  ...pender({
    type: GET_REIVEW_SERIES,
    onSuccess: (state, action) => {
      if(action.payload.data){
        const series = List(state.get('reviewSeries'))
        return state.set('reviewSeries', List(series.concat(action.payload.data)))
      }else {
        return state.set('lastSeries', true)
      }
    }
  }),
  ...pender({
    type: POST_REVIEW,
    onSuccess: (state, action) => {
      return state.set('data', Map(action.payload.data))
    }
  }),
  ...pender({
    type: PATCH_REVIEW,
    onSuccess: (state, action) => {
      return state.set('data', Map(action.payload.data));
    }
  })

}, initialState);