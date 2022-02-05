import { createStore, combineReducers } from 'redux';
import pantryReducer from './slices/pantry';
import notificationReducer from './slices/notifications';

const rootReducer = combineReducers({
  pantry: pantryReducer,
  notifications: notificationReducer,
});

export default createStore(rootReducer);
