import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map, List } from 'immutable';
import * as OrderAPI from '../../lib/api/order';
import * as ModelAPI from '../../lib/api/model';

const CHANGE_CUSTOMER_INFO_INPUT = 'order/CHANGE_INPUT';
const CHANGE_MODEL_TEMPLATE_INPUT = 'order/CHANGE_MODEL_TEMPLATE_INPUT';
const CHANGE_MODEL_ADD_INPUT = 'order/CHANGE_MODEL_ADD_INPUT'; // 특이사항
const CHANGE_ORDER_SEARCH_INPUT = 'order/CHANGE_ORDER_SEARCH_INPUT';
const CHANGE_VIEW = 'order/CHANGE_VIEW';
const CHANGE_DETAIL_VIEW = 'order/CHANGE_DETAIL_VIEW'
const CHANGE_IMG_TEXT_VIEW = 'order/CHANGE_IMG_TEXT_VIEW';
const CHANGE_INPUT_VIEW = 'order/CHANGE_INPUT_VIEW';
const ORDER_INIT = 'order/ORDER_INIT';
const SET_ERROR = 'order/SET_ERROR';
const GET_ALL_ORDER = 'order/GET_ALL_ORDER';
const GET_ORDER_BY_ID = 'order/GET_ORDER_BY_ID';
const GET_ORDER_BY_NUM = 'order/GET_ORDER_BY_NUM';
const GET_ORDERS_BY_MAKER_ID = 'order/GET_ORDERS_BY_MAKER_ID';
const GET_ORDER_POST_FORM_BY_MODEL = 'order/GET_ORDER_POST_FORM_BY_MODEL'
const POST_ORDER = 'order/POST_ORDER';
const PATCH_ORDER = 'order/PATCH_ORDER';
const PATCH_ORDER_DEADLINE = 'order/PATCH_ORDER_DEADLINE';
const DELETE_ORDER = 'order/DELETE_ORDER';
const PATCH_IMG = 'order/PATCH_IMG';
const REMOVE_IMG = 'order/REMOVE_IMG';
const PATCH_MODEL_IMG = 'order/PATCH_MODEL_IMG';
const REMOVE_MODEL_IMG = 'order/REMOVE_MODEL_IMG';
const PATCH_PROCESSING = 'order/PATCH_PROCESSING';
const DELETE_PROCESSING = 'order/DELETE_PROCESSING';
const CHANGE_STATE = 'order/CHANGE_STATE';
const CHANGE_PROCESSING_STATE = 'order/CHANGE_PROCESSING_STATE';

export const changeCustomerInfoInput = createAction(CHANGE_CUSTOMER_INFO_INPUT);
export const changeModelTemplateInput = createAction(CHANGE_MODEL_TEMPLATE_INPUT);
export const changeModelAddInput = createAction(CHANGE_MODEL_ADD_INPUT);
export const changeOrderSearchInput = createAction(CHANGE_ORDER_SEARCH_INPUT);
export const changeView = createAction(CHANGE_VIEW);
export const changeDetailView = createAction(CHANGE_DETAIL_VIEW);
export const changeImgTextView = createAction(CHANGE_IMG_TEXT_VIEW);
export const changeInputView = createAction(CHANGE_INPUT_VIEW);
export const orderInit = createAction(ORDER_INIT);
export const setError = createAction(SET_ERROR);
export const getAllOrder = createAction(GET_ALL_ORDER, OrderAPI.getAllOrder);
export const getOrderById = createAction(GET_ORDER_BY_ID, OrderAPI.getOrderById);
export const getOrderByNum = createAction(GET_ORDER_BY_NUM, OrderAPI.getOrderByNum);
export const getOrdersByMakerId = createAction(GET_ORDERS_BY_MAKER_ID, OrderAPI.getOrdersByMakerId)
export const getOrderPostFormByModel = createAction(GET_ORDER_POST_FORM_BY_MODEL, ModelAPI.getModelByModelName)
export const postOrder = createAction(POST_ORDER, OrderAPI.postOrder);
export const patchOrder = createAction(PATCH_ORDER, OrderAPI.patchOrder);
export const patchOrderDeadline = createAction(PATCH_ORDER_DEADLINE, OrderAPI.patchOrderDeadline);
export const deleteOrder = createAction(DELETE_ORDER, OrderAPI.deleteOrder);
export const patchImg = createAction(PATCH_IMG, OrderAPI.patchImg);
export const removeImg = createAction(REMOVE_IMG, OrderAPI.removeImg);
export const patchModelImg = createAction(PATCH_MODEL_IMG, OrderAPI.patchModelImg);
export const removeModelImg = createAction(REMOVE_MODEL_IMG, OrderAPI.removeModelImg);
export const patchProcessing = createAction(PATCH_PROCESSING, OrderAPI.patchProcessing);
export const deleteProcessing = createAction(DELETE_PROCESSING, OrderAPI.deleteProcessing);
export const changeState = createAction(CHANGE_STATE, OrderAPI.changeState);
export const changeProcessingState = createAction(CHANGE_PROCESSING_STATE, OrderAPI.changeProcessingState);

const initialState = Map({
  view: "ordered",
  search: '',
  detailView: false,
  imgTextView: false,
  allOrders: List([]),
  orderById: Map({}),
  postForm: Map({
    customerInfo: Map({
      name: '',
      phone: '',
      address: '',
    }),
    model: Map({})
  }),
  inputView: true,
  error: null
});

export default handleActions({
  [CHANGE_CUSTOMER_INFO_INPUT]: (state, action) => {
    const { id, name, value } = action.payload;
    return state.setIn(['postForm', 'customerInfo', name], value)
  },
  [CHANGE_MODEL_TEMPLATE_INPUT]: (state, action) => {
    const { name, value, id } = action.payload
    return state.setIn(['postForm', 'model', 'contents', 'template', id, 'value'], value)
  },
  [CHANGE_MODEL_ADD_INPUT]: (state, action) => {
    const { name, value } = action.payload
    return state.setIn(['postForm', 'model', 'contents', name], value)
  },
  [CHANGE_ORDER_SEARCH_INPUT]: (state, action) => {
    return state.set('search', action.payload)
  },
  [CHANGE_VIEW]: (state, action) => {
    return state.set('view', action.payload)
  },
  [CHANGE_DETAIL_VIEW]: (state, action) => {
    return state.set('detailView', action.payload)
  },
  [CHANGE_IMG_TEXT_VIEW]: (state, action) => {
    return state.set('imgTextView', action.payload);
  },
  [CHANGE_INPUT_VIEW]: (state, action) => {
    return state.set('inputView', action.payload);
  },
  [ORDER_INIT]: (state, action) => {
    return state.set('orderById', Map({}))
  },
  [SET_ERROR]: (state, action) => {
    const { message } = action.payload;
    return state.set('error', message);
  },
  ...pender({
    type: GET_ALL_ORDER,
    onSuccess: (state, action) => state.set('allOrders', List(action.payload.data))
  }),
  ...pender({
    type: GET_ORDER_BY_ID,
    onSuccess: (state, action) => {
      return state.set('orderById', Map(action.payload.data))
  }
  }),
  ...pender({
    type: GET_ORDER_BY_NUM,
    onSuccess: (state, action) => {
      return state.set('orderById', Map(action.payload.data))
  }
  }),
  ...pender({
    type: GET_ORDERS_BY_MAKER_ID,
    onSuccess: (state, action) => {
      return state.set('allOrders', List(action.payload.data))
    }
  }),
  ...pender({
    type: GET_ORDER_POST_FORM_BY_MODEL,
    onSuccess: (state, action) => {
      const model = action.payload.data;
      return state.setIn(['postForm', 'model'], model)
    }
  }),
  ...pender({
    type: POST_ORDER,
    onSuccess: (state, action) => state.set('orderById', Map(action.payload.data)
    )
  }),
  ...pender({
    type: PATCH_ORDER,
    onSuccess: (state, action) => state.setIn(['orderById', 'contents'], action.payload.data)
  }),
  ...pender({
    type: PATCH_ORDER_DEADLINE,
    onSuccess: (state, action) => {
      return state.setIn(['orderById', 'deadline'], action.payload.data.deadline)
    }
  }),
  ...pender({
    type: DELETE_ORDER,
    onSuccess: (state, action) => {
      let orders = state.get('allOrders')
      let deletedIndex = orders.findIndex(order => order._id === action.payload.data)
      let newOrders = orders.delete(deletedIndex)
      return state.set('allOrders', newOrders)
    }
  }),
  ...pender({
    type: PATCH_IMG,
    onSuccess: (state, action) => {
      const images = List(state.getIn(['orderById', 'images']));
      return state.setIn(['orderById', 'images'], List(images.concat(action.payload.data)))
    }
  }),
  ...pender({
    type: REMOVE_IMG,
    onSuccess: (state, action) => {
      const images = List(state.getIn(['orderById', 'images']));
      return state.setIn(['orderById', 'images'], images.delete(images.indexOf(`/img/${action.payload.data}`)))
    }
  }),
  ...pender({
    type: PATCH_MODEL_IMG,
    onSuccess: (state, action) => {
      return state.setIn(['orderById', 'modelImage'], action.payload.data)
    }
  }),
  ...pender({
    type: REMOVE_MODEL_IMG,
    onSuccess: (state, action) => {
      return state.setIn(['orderById', 'modelImage'], null)
    }
  }),
  ...pender({
    type: PATCH_PROCESSING,
    onSuccess: (state, action) => {
      const processing = action.payload.data.processing;
      return state.setIn(['orderById', processing], action.payload.data.date)
    }
  }),
  ...pender({
    type: DELETE_PROCESSING,
    onSuccess: (state, action) => {
      const processing = action.payload.data;
      return state.setIn(['orderById', processing], null)
    }
  }),
  ...pender({
    type: CHANGE_STATE,
    onSuccess: (state, action) => {
      const allOrders = state.get('allOrders');
      const index = allOrders.findIndex(order => order._id === state.getIn(['orderById', '_id']));
      return state.setIn(['allOrders', index, 'state'], action.payload.data.state);
    }
  }),
  ...pender({
    type: CHANGE_PROCESSING_STATE,
    onSuccess: (state, action) => {
      const processingState = action.payload.data.processingState;
      return state.setIn(['orderById', 'processingState'], processingState)
    }
  })
}, initialState);