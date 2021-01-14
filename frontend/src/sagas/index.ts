import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import userSaga from './user';
import { API_HOST } from '../utils/constants';

axios.defaults.baseURL = `${API_HOST}/api/`;
const token = localStorage.getItem('jwtToken');
if (token) {
  axios.defaults.headers.common['Authorization'] = token;
}

export default function* rootSaga() {
  yield all([
    fork(userSaga),
  ]);
}