import { combineReducers } from 'redux';
import user from './user';
import event from './event';

const rootReducer = combineReducers({ user, event });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
