import { createStore, combineReducers } from 'redux';
import pantryReducer from './slices/pantry';
import notificationReducer from './slices/notifications';
import recipesReducer from './slices/recipes';
import shoppingListReducer from './slices/shoppingList';

const rootReducer = combineReducers({
  pantry: pantryReducer,
  notifications: notificationReducer,
  recipes: recipesReducer,
  shoppingList: shoppingListReducer,
});

export default createStore(rootReducer);
