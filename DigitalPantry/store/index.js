import { createStore, combineReducers } from 'redux';
import pantryReducer from './slices/pantry';
import notificationReducer from './slices/notifications';
import shoppingListReducer from './slices/shoppingList';

const rootReducer = combineReducers({
  pantry: pantryReducer,
  notifications: notificationReducer,
  shoppingList: shoppingListReducer,
});

export default createStore(rootReducer);
