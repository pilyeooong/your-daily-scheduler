import { all, fork, call, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOAD_EVENTS_FAILURE,
  LOAD_EVENTS_REQUEST,
  LOAD_EVENTS_SUCCESS,
  ADD_EVENT_FAILURE,
  ADD_EVENT_REQUEST,
  ADD_EVENT_SUCCESS,
} from '../actions/types';
import { AddEventRequestAction, IAddEvent } from '../actions';

function loadEventsAPI() {
  const token = localStorage.getItem('jwtToken');
  return axios.get('/events', { headers: { Authorization: token }});
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
      error: err.response.data,
    });
  }
}

function* watchLoadEvents() {
  yield takeLatest(LOAD_EVENTS_REQUEST, loadEvents);
}

function addEventAPI(data: IAddEvent) {
  return axios.post('/event', data);
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

export default function* eventSaga() {
  yield all([fork(watchLoadEvents), fork(watchAddEvents)]);
}
