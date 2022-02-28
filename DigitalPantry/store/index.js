import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import pantryReducer from './slices/pantry';
import notificationReducer from './slices/notifications';
import recipesReducer from './slices/recipes';
import shoppingListReducer from './slices/shoppingList';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['pantry', 'notifications', 'recipes', 'shoppingList'],
};

const rootReducer = combineReducers({
  pantry: pantryReducer,
  notifications: notificationReducer,
  recipes: recipesReducer,
  shoppingList: shoppingListReducer,
});

export const store = createStore(persistReducer(persistConfig, rootReducer), applyMiddleware(thunk));
export const persistor = persistStore(store);