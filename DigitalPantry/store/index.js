import { createStore, combineReducers } from 'redux';
import pantryReducer from './slices/pantry';

const rootReducer = combineReducers({
  pantry: pantryReducer,
})

export default createStore(rootReducer);
