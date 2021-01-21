import produce from 'immer';
import { EventAction } from '../actions';
import {
  LOAD_EVENTS_REQUEST,
  LOAD_EVENTS_SUCCESS,
  LOAD_EVENTS_FAILURE,
  ADD_EVENT_REQUEST,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAILURE,
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
}

const initialState: IUserReducerState = {
  events: [],
  loadEventsLoading: false,
  loadEventsDone: false,
  loadEventsError: null,

  addEventLoading: false,
  addEventDone: false,
  addEventError: null,
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
    }
  });
};

export default reducer;
