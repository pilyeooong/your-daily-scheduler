import { IEvent } from '../typings/db';
import { IEventForm } from '../components/EventForm';
import {
  LOAD_MY_INFO_FAILURE,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  LOAD_EVENTS_FAILURE,
  LOAD_EVENTS_SUCCESS,
  LOAD_EVENTS_REQUEST,
  ADD_EVENT_REQUEST,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAILURE,
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

export interface LogoutRequestAction {
  type: typeof LOG_OUT_REQUEST;
}

export interface LogoutSuccessAction {
  type: typeof LOG_OUT_SUCCESS;
}

export interface LogoutFailureAction {
  type: typeof LOG_OUT_FAILURE;
  error: string | null | Error;
}

export interface SignUpRequestAction {
  type: typeof SIGN_UP_REQUEST;
  data: IAuthForm;
}

export interface SignUpSuccessAction {
  type: typeof SIGN_UP_SUCCESS;
}

export interface SignUpFailureAction {
  type: typeof SIGN_UP_FAILURE;
  error: string | null | Error;
}

export type UserAction =
  | LoadMyInfoRequestAction
  | LoadMyInfoSuccessAction
  | LoadMyInfoFailureAction
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutRequestAction
  | LogoutSuccessAction
  | LogoutFailureAction
  | SignUpSuccessAction
  | SignUpRequestAction
  | SignUpFailureAction;

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
      password,
    },
  };
};

export const logoutRequestAction = (): LogoutRequestAction => {
  return {
    type: LOG_OUT_REQUEST,
  };
};

export const signUpRequestAction = (
  email: string,
  password: string
): SignUpRequestAction => {
  return {
    type: SIGN_UP_REQUEST,
    data: {
      email,
      password,
    },
  };
};

export interface LoadEventsRequestAction {
  type: typeof LOAD_EVENTS_REQUEST;
}

export interface LoadEventsSuccessAction {
  type: typeof LOAD_EVENTS_SUCCESS;
  data: IEvent[]
}

export interface LoadEventsFailureAction {
  type: typeof LOAD_EVENTS_FAILURE;
  error: string | null | Error;
}

export interface IAddEvent {
  content: string;
  date: string;
}

export interface AddEventRequestAction {
  type: typeof ADD_EVENT_REQUEST;
  data: IAddEvent
}

export interface AddEventSuccessAction {
  type: typeof ADD_EVENT_SUCCESS;
  data: IEvent
}

export interface AddEventFailureAction {
  type: typeof ADD_EVENT_FAILURE;
  error: string | null | Error;
}

export type EventAction =
  | LoadEventsRequestAction
  | LoadEventsSuccessAction
  | LoadEventsFailureAction
  | AddEventRequestAction
  | AddEventSuccessAction
  | AddEventFailureAction;

export const loadEventsAction = (): LoadEventsRequestAction => {
  return {
    type: LOAD_EVENTS_REQUEST,
  };
}

export const addEventAction = (data: IAddEvent): AddEventRequestAction => {
  return {
    type: ADD_EVENT_REQUEST,
    data
  }
}