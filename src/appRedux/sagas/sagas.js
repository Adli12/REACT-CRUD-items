import { call, put, takeEvery } from 'redux-saga/effects';
import api from '../../services/Api'; // Pastikan Anda mengimpor api dari file yang benar
import {
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILURE,
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILURE,
  UPDATE_ITEM_REQUEST,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_FAILURE,
  DELETE_ITEM_REQUEST,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAILURE,
} from '../constants/ActionTypes';

function* fetchItems() {
  try {
    const response = yield call(api.fetchItems);
    if (response.ok) {
      yield put({ type: FETCH_ITEMS_SUCCESS, payload: response.data });
    } else {
      yield put({ type: FETCH_ITEMS_FAILURE, error: response.problem });
    }
  } catch (error) {
    yield put({ type: FETCH_ITEMS_FAILURE, error });
  }
}

function* addItem(action) {
  try {
    const response = yield call(api.addItem, action.payload);
    if (response.ok) {
      yield put({ type: ADD_ITEM_SUCCESS, payload: response.data });
      yield fetchItems(); // Refresh the list after adding
    } else {
      yield put({ type: ADD_ITEM_FAILURE, error: response.problem });
    }
  } catch (error) {
    yield put({ type: ADD_ITEM_FAILURE, error });
  }
}

function* updateItem(action) {
  try {
    console.log('Updating item with data:', action.payload); // Debug: Cetak data yang dikirimkan
    const response = yield call(api.updateItem, action.payload);
    if (response.ok) {
      console.log('Update response:', response); // Debug: Cetak respons yang diterima
      yield put({ type: UPDATE_ITEM_SUCCESS, payload: response.data });
      yield fetchItems(); // Refresh the list after updating
    } else {
      console.error('Update failed with problem:', response.problem); // Debug: Cetak masalah yang terjadi
      yield put({ type: UPDATE_ITEM_FAILURE, error: response.problem });
    }
  } catch (error) {
    console.error('Update error:', error); // Debug: Cetak error yang terjadi
    yield put({ type: UPDATE_ITEM_FAILURE, error });
  }
}

function* deleteItem(action) {
  try {
    const response = yield call(api.deleteItem, action.payload);
    if (response.ok) {
      yield put({ type: DELETE_ITEM_SUCCESS, payload: action.payload });
      yield fetchItems(); // Refresh the list after deleting
    } else {
      yield put({ type: DELETE_ITEM_FAILURE, error: response.problem });
    }
  } catch (error) {
    yield put({ type: DELETE_ITEM_FAILURE, error });
  }
}

export default function* itemSagas() {
  yield takeEvery(FETCH_ITEMS_REQUEST, fetchItems);
  yield takeEvery(ADD_ITEM_REQUEST, addItem);
  yield takeEvery(UPDATE_ITEM_REQUEST, updateItem);
  yield takeEvery(DELETE_ITEM_REQUEST, deleteItem);
}
