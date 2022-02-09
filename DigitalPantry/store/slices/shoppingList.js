import { v4 as uuid } from 'uuid';

export const ADD_ITEM = 'list/add_item';
export const DELETE_ITEM = 'list/delete_item';
export const EDIT_ITEM = 'list/edit_item';
export const DELETE_ITEMS = 'list/delete_items';
export const CLEAR_SHOPPING_LIST = 'list/clear_shopping_list';
export const ADD_SUGGESTED_ITEM = 'list/add_suggested_item';
export const DELETE_SUGGESTED_ITEM = 'list/delete_suggested_item';
export const SET_SUGGESTED_ITEMS = 'list/set_suggested_items';
export const ADD_FROM_SUGGESTED_TO_LIST = 'list/add_from_suggested_to_list';

export const addItem = ({ amount, name, info, units }) => ({
  type: ADD_ITEM,
  amount,
  name,
  info,
  units,
});

export const editItem = ({ key, amount, name, info, units }) => ({
  type: EDIT_ITEM,
  key,
  amount,
  name,
  info,
  units,
});

export const deleteItem = (key) => ({
  type: DELETE_ITEM,
  key,
});

export const addSuggestedItem = ({ amount, name, info, units }) => ({
  type: ADD_SUGGESTED_ITEM,
  amount,
  name,
  info,
  units,
});

export const deleteSuggestedItem = (key) => ({
  type: DELETE_SUGGESTED_ITEM,
  key,
});

export const deleteItems = (keys) => ({
  type: DELETE_ITEMS,
  keys,
})

// Expects the item with the provided key to be in the suggested.
// This both removes the item from the suggested list and adds it to the shopping list.
export const moveSuggestedToList = (key) => ({
  type: ADD_FROM_SUGGESTED_TO_LIST,
  key,
});

const INITIAL_STATE = {
  list: [{
    key: uuid(),
    name: 'Oranges',
    info: 'orange data',
    amount: '6',
  }, {
    key: uuid(),
    name: 'Apples',
    info: 'apple data',
    amount: '11',
  }, {
    key: uuid(),
    name: 'Broccoli',
    info: 'broccoli data',
    amount: '1',
  }],
  suggested: [{
    key: uuid(),
    name: 'Onions',
    info: 'onion data',
    amount: '3',
  }, {
    key: uuid(),
    name: 'Cheese',
    info: 'cheese data',
    amount: '2',
  }, {
    key: uuid(),
    name: 'Milk',
    info: 'milk data',
    amount: '3',
  }],
};

const reducers = {
   [ADD_ITEM]: (state, action) => ({
     ...state,
     list: [...state.list, {
      key: uuid(),
      name: action.name,
      info: action.info,
      amount: action.amount,
      units: action.units,
     }],
   }),
   [EDIT_ITEM]: (state, action) => ({
    ...state,
    list: state.list.map((item) => item.key === action.key ? ({
      ...item,
      name: action.name,
      info: action.info,
      amount: action.amount,
      units: action.units,
    }) : item),
  }),
  [DELETE_ITEM]: (state, action) => ({
    ...state,
    list: state.list.filter(({ key }) => key !== action.key),
  }),
  [CLEAR_SHOPPING_LIST]: (state) => ({
    ...state,
    list: [],
  }),
  [ADD_FROM_SUGGESTED_TO_LIST]: (state, action) => ({
    ...state,
    list: [...state.list, state.suggested.find(({ key }) => key === action.key)],
    suggested: state.suggested.filter(({ key }) => key !== action.key),
   }),
};

// boilerplate
export default function (state = INITIAL_STATE, action) {
  if (reducers[action.type]) {
    return reducers[action.type](state, action);
  }

  return state;
};
