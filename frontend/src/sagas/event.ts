import { all, fork, call, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOAD_EVENTS_FAILURE,
  LOAD_EVENTS_REQUEST,
  LOAD_EVENTS_SUCCESS,
  ADD_EVENT_FAILURE,
  ADD_EVENT_REQUEST,
  ADD_EVENT_SUCCESS,
  EDIT_EVENT_FAILURE,
  EDIT_EVENT_REQUEST,
  EDIT_EVENT_SUCCESS,
  DELETE_EVENT_FAILURE,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
} from '../actions/types';
import {
  AddEventRequestAction,
  DeleteEventRequestAction,
  EditEventRequestAction,
  IAddEvent,
  IDeleteEvent,
  IEditEvent,
} from '../actions';

function loadEventsAPI() {
  const token = localStorage.getItem('jwtToken');
  return axios.get('/events', { headers: { Authorization: token } });
}

function* loadEvents() {
  try {
    const result = yield call(loadEventsAPI);
    yield put({
      type: LOAD_EVENTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_EVENTS_FAILURE,
      error: err.response.status,
    });
  }
}

function* watchLoadEvents() {
  yield takeLatest(LOAD_EVENTS_REQUEST, loadEvents);
}

function addEventAPI(data: IAddEvent) {
  const token = localStorage.getItem('jwtToken');
  return axios.post('/event', data, { headers: { Authorization: token } });
}

function* addEvent(action: AddEventRequestAction) {
  try {
    const result = yield call(addEventAPI, action.data);
    yield put({
      type: ADD_EVENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_EVENT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchAddEvents() {
  yield takeLatest(ADD_EVENT_REQUEST, addEvent);
}

function editEventAPI(data: IEditEvent) {
  const token = localStorage.getItem('jwtToken');
  return axios.patch(`/event/${data.id}`, data, { headers: { Authorization: token } });
}

function* editEvent(action: EditEventRequestAction) {
  try {
    const result = yield call(editEventAPI, action.data);
    yield put({
      type: EDIT_EVENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: EDIT_EVENT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchEditEvent() {
  yield takeLatest(EDIT_EVENT_REQUEST, editEvent);
}

function deleteEventAPI(data: IDeleteEvent) {
  const token = localStorage.getItem('jwtToken');
  return axios.delete(`/event/${data.id}`, { headers: { Authorization: token } });
}

function* deleteEvent(action: DeleteEventRequestAction) {
  try {
    const result = yield call(deleteEventAPI, action.data);
    yield put({
      type: DELETE_EVENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DELETE_EVENT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchDeleteEvent() {
  yield takeLatest(DELETE_EVENT_REQUEST, deleteEvent);
}

export default function* eventSaga() {
  yield all([
    fork(watchLoadEvents),
    fork(watchAddEvents),
    fork(watchEditEvent),
    fork(watchDeleteEvent),
  ]);
}
