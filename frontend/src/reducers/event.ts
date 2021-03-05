import produce from 'immer';
import { EventAction } from '../actions';
import {
  LOAD_EVENTS_REQUEST,
  LOAD_EVENTS_SUCCESS,
  LOAD_EVENTS_FAILURE,
  ADD_EVENT_REQUEST,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAILURE,
  EDIT_EVENT_REQUEST,
  EDIT_EVENT_SUCCESS,
  EDIT_EVENT_FAILURE,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAILURE,
  RESET_DONE_STATE,
} from '../actions/types';
import { IEvent } from '../typings/db';

export interface IUserReducerState {
  events: IEvent[];
  loadEventsLoading: boolean;
  loadEventsDone: boolean;
  loadEventsError: string | null | Error;

  addEventLoading: boolean;
  addEventDone: boolean;
  addEventError: string | null | Error;

  editEventLoading: boolean;
  editEventDone: boolean;
  editEventError: string | null | Error;

  deleteEventLoading: boolean;
  deleteEventDone: boolean;
  deleteEventError: string | null | Error;
}

const initialState: IUserReducerState = {
  events: [],
  loadEventsLoading: false,
  loadEventsDone: false,
  loadEventsError: null,

  addEventLoading: false,
  addEventDone: false,
  addEventError: null,

  editEventLoading: false,
  editEventDone: false,
  editEventError: null,

  deleteEventLoading: false,
  deleteEventDone: false,
  deleteEventError: null,
};

const reducer = (state = initialState, action: EventAction) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_EVENTS_REQUEST:
        draft.loadEventsLoading = true;
        draft.loadEventsDone = false;
        draft.loadEventsError = null;
        break;
      case LOAD_EVENTS_SUCCESS:
        draft.loadEventsLoading = false;
        draft.loadEventsDone = true;
        draft.events = action.data;
        break;
      case LOAD_EVENTS_FAILURE:
        draft.loadEventsLoading = false;
        draft.loadEventsDone = false;
        draft.loadEventsError = action.error;
        break;
      case ADD_EVENT_REQUEST:
        draft.addEventLoading = true;
        draft.addEventDone = false;
        draft.addEventError = null;
        break;
      case ADD_EVENT_SUCCESS:
        draft.addEventLoading = false;
        draft.addEventDone = true;
        draft.events = draft.events.concat(action.data);
        break;
      case ADD_EVENT_FAILURE:
        draft.addEventLoading = false;
        draft.addEventDone = false;
        draft.addEventError = action.error;
        break;
      case EDIT_EVENT_REQUEST:
        draft.editEventLoading = true;
        draft.editEventDone = false;
        draft.editEventError = null;
        break;
      case EDIT_EVENT_SUCCESS:
        draft.editEventLoading = false;
        draft.editEventDone = true;
        draft.events.find((v) => v.id === action.data.id)!.content = action.data.content;
        draft.events.find((v) => v.id === action.data.id)!.startTime = action.data.startTime;
        draft.events.find((v) => v.id === action.data.id)!.endTime = action.data.endTime;
        break;
      case EDIT_EVENT_FAILURE:
        draft.deleteEventLoading = false;
        draft.deleteEventDone = false;
        draft.deleteEventError = action.error;
        break;
      case DELETE_EVENT_REQUEST:
        draft.deleteEventLoading = true;
        draft.deleteEventDone = false;
        draft.deleteEventError = null;
        break;
      case DELETE_EVENT_SUCCESS:
        draft.deleteEventLoading = false;
        draft.deleteEventDone = true;
        draft.events = draft.events.filter((v) => v.id !== action.data.id);
        break;
      case DELETE_EVENT_FAILURE:
        draft.deleteEventLoading = false;
        draft.deleteEventDone = false;
        draft.deleteEventError = action.error;
        break;
      case RESET_DONE_STATE:
        draft.addEventDone = false;
        draft.editEventDone = false;
        draft.deleteEventDone = false;
        break;
    }
  });
};

export default reducer;
