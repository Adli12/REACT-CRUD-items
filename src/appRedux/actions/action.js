import {
  FETCH_ITEMS_REQUEST,
  ADD_ITEM_REQUEST,
  UPDATE_ITEM_REQUEST,
  DELETE_ITEM_REQUEST,
} from '../../constants/ActionTypes';

// Define action creators for CRUD operations
export const fetchItemsRequest = () => ({ type: FETCH_ITEMS_REQUEST });
export const addItemRequest = (item) => ({ type: ADD_ITEM_REQUEST, payload: item });
export const updateItemRequest = (item) => ({ type: UPDATE_ITEM_REQUEST, payload: item });
export const deleteItemRequest = (itemId) => ({ type: DELETE_ITEM_REQUEST, payload: itemId });

  