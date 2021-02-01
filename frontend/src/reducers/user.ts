import produce from 'immer';
import { UserAction } from '../actions';
import {
  LOAD_MY_INFO_FAILURE,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  KAKAO_LOGIN_FAILURE,
  KAKAO_LOGIN_REQUEST,
  KAKAO_LOGIN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  RESET_DONE_STATE,
} from '../actions/types';
import { IUser } from '../typings/db';

export interface IUserReducerState {
  me: IUser | null;
  loadMyInfoLoading: boolean;
  loadMyInfoDone: boolean;
  loadMyInfoError: string | null | Error;
  loginLoading: boolean;
  loginDone: boolean;
  loginError: string | null | Error;
  logoutLoading: boolean;
  logoutDone: boolean;
  logoutError: string | null | Error;
  signUpLoading: boolean;
  signUpDone: boolean;
  signUpError: string | null | Error;
  updateProfileLoading: boolean;
  updateProfileDone: boolean;
  updateProfileError: string | null | Error;
}

const initialState: IUserReducerState = {
  me: null,
  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: null,

  loginLoading: false,
  loginDone: false,
  loginError: null,

  logoutLoading: false,
  logoutDone: false,
  logoutError: null,

  signUpLoading: false,
  signUpDone: false,
  signUpError: null,

  updateProfileLoading: false,
  updateProfileDone: false,
  updateProfileError: null,
};

const reducer = (state = initialState, action: UserAction) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_MY_INFO_REQUEST:
        draft.loadMyInfoLoading = true;
        draft.loadMyInfoDone = false;
        draft.loadMyInfoError = null;
        draft.updateProfileDone = false;
        draft.me = null;
        break;
      case LOAD_MY_INFO_SUCCESS:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoDone = true;
        draft.me = action.data;
        break;
      case LOAD_MY_INFO_FAILURE:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoDone = false;
        draft.loadMyInfoError = action.error;
        break;
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpDone = false;
        draft.signUpError = null;
        break;
      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpDone = false;
        draft.signUpError = action.error;
        break;
      case LOG_IN_REQUEST:
        draft.loginLoading = true;
        draft.loginDone = false;
        draft.loginError = null;
        break;
      case LOG_IN_SUCCESS:
        draft.loginLoading = false;
        draft.loginDone = true;
        draft.me = action.data;
        break;
      case LOG_IN_FAILURE:
        draft.loginLoading = false;
        draft.loginDone = false;
        draft.loginError = action.error;
        break;
      case KAKAO_LOGIN_REQUEST:
        draft.loginLoading = true;
        draft.loginDone = false;
        draft.loginError = null;
        break;
      case KAKAO_LOGIN_SUCCESS:
        draft.loginLoading = false;
        draft.loginDone = true;
        draft.me = action.data;
        break;
      case KAKAO_LOGIN_FAILURE:
        draft.loginLoading = false;
        draft.loginDone = false;
        draft.loginError = action.error;
        break;
      case LOG_OUT_REQUEST:
        draft.logoutLoading = true;
        draft.logoutDone = false;
        draft.logoutError = null;
        break;
      case LOG_OUT_SUCCESS:
        draft.logoutLoading = false;
        draft.logoutDone = true;
        draft.me = null;
        break;
      case LOG_OUT_FAILURE:
        draft.logoutLoading = false;
        draft.logoutDone = false;
        draft.logoutError = action.error;
        break;
      case UPDATE_PROFILE_REQUEST:
        draft.updateProfileLoading = true;
        draft.updateProfileDone = false;
        draft.updateProfileError = null;
        break;
      case UPDATE_PROFILE_SUCCESS:
        draft.updateProfileLoading = false;
        draft.updateProfileDone = true;
        draft.me = action.data;
        break;
      case UPDATE_PROFILE_FAILURE:
        draft.updateProfileLoading = false;
        draft.updateProfileDone = false;
        draft.updateProfileError = action.error;
        break;
      case RESET_DONE_STATE:
        draft.updateProfileDone = false;
        break;
    }
  });
};

export default reducer;
