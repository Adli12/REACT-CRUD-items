import {
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILURE,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILURE,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_FAILURE,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAILURE,
} from '../../constants/ActionTypes';

const initialState = {
  items: [],
  error: null,
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        items: action.payload,
      };
    case FETCH_ITEMS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case ADD_ITEM_SUCCESS:
    case ADD_ITEM_FAILURE:
    case UPDATE_ITEM_SUCCESS:
    case UPDATE_ITEM_FAILURE:
    case DELETE_ITEM_SUCCESS:
    case DELETE_ITEM_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default itemReducer;
