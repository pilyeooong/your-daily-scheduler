import {
  LOAD_MY_INFO_FAILURE,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from './types';

export interface LoadMyInfoRequestAction {
  type: typeof LOAD_MY_INFO_REQUEST;
}

export interface LoadMyInfoSuccessAction {
  type: typeof LOAD_MY_INFO_SUCCESS;
  data: Object;
}

export interface LoadMyInfoFailureAction {
  type: typeof LOAD_MY_INFO_FAILURE;
  error: string | null | Error;
}

export interface IAuthForm {
  email: string;
  password: string;
}

export interface LoginRequestAction {
  type: typeof LOG_IN_REQUEST;
  data: IAuthForm;
}

export interface LoginSuccessAction {
  type: typeof LOG_IN_SUCCESS;
  data: Object;
}

export interface LoginFailureAction {
  type: typeof LOG_IN_FAILURE;
  error: string | null | Error;
}

export interface SignUpRequestAction {
  type: typeof SIGN_UP_REQUEST,
  data: IAuthForm
}

export interface SignUpSuccessAction {
  type: typeof SIGN_UP_SUCCESS
}

export interface SignUpFailureAction {
  type: typeof SIGN_UP_FAILURE,
  error: string | null | Error
}

export type UserAction =
  | LoadMyInfoRequestAction
  | LoadMyInfoSuccessAction
  | LoadMyInfoFailureAction
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | SignUpSuccessAction
  | SignUpRequestAction
  | SignUpFailureAction

export const loadMyInfoRequest = (): LoadMyInfoRequestAction => {
  return {
    type: LOAD_MY_INFO_REQUEST,
  };
};

export const loginRequestAction = (
  email: string,
  password: string
): LoginRequestAction => {
  return {
    type: LOG_IN_REQUEST,
    data: {
      email,
      password
    }
  };
};

export const signUpRequestAction = (email: string, password: string): SignUpRequestAction => {
  return {
    type: SIGN_UP_REQUEST,
    data: {
      email,
      password
    }
  }
}