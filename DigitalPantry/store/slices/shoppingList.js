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
export const CLEAR_SUGGESTED_ITEMS = 'list/clear_suggested_items';
export const ADD_ALL_SUGGESTED_TO_LIST = 'list/add_all_suggested_to_list';
export const UPDATE_SUGGESTED_ITEM = '/list/update_suggested_item';

export const addItem = ({ key, amount, name, unit, image, brand, description, remaining }) => ({
  type: ADD_ITEM,
  key,
  amount,
  name,
  description,
  unit,
  image,
  brand,
  remaining,
});

export const editItem = ({ key, amount, name, unit, image, brand, description, remaining }) => ({
  type: EDIT_ITEM,
  key,
  amount,
  name,
  description,
  unit,
  image,
  brand,
  remaining,
});

export const deleteItem = (key) => ({
  type: DELETE_ITEM,
  key,
});

export const addSuggestedItem = ({ key, amount, name, unit, image, brand, description, remaining }) => ({
  type: ADD_SUGGESTED_ITEM,
  key,
  amount,
  name,
  description,
  unit,
  image,
  brand,
  remaining,
});

export const deleteSuggestedItem = (key) => ({
  type: DELETE_SUGGESTED_ITEM,
  key
});

/**
 * Deletes several items at a time based on the array of item keys
 * Used to "delete checked items"
 * @param {array<string>} keys
 * @returns action to dispatch
 */
export const deleteItems = (keys) => ({
  type: DELETE_ITEMS,
  keys,
});

export const clearShoppingList = () => ({
  type: CLEAR_SHOPPING_LIST,
});

// Expects the item with the provided key to be in the suggested.
// This both removes the item from the suggested list and adds it to the shopping list.
export const moveSuggestedToList = (key) => ({
  type: ADD_FROM_SUGGESTED_TO_LIST,
  key,
});

export const clearSuggestedItems = () => ({
  type: CLEAR_SUGGESTED_ITEMS,
});

export const moveAllSuggested = () => ({
  type: ADD_ALL_SUGGESTED_TO_LIST,
});

export const updateSuggestedItem = ({ key, amount, name, unit, image, brand, description, remaining }) => ({
  type: UPDATE_SUGGESTED_ITEM,
  key,
  amount,
  name,
  description,
  unit,
  image,
  brand,
  remaining,
});




const INITIAL_STATE = {
  list:[],
  suggested:[],
 
/*
  list: [{
    key: uuid(),
    name: 'Shopping Item1',
    unit: 'na',
    image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg',
    brand:'na',
    description:'na',
    remaining:'Low',
    amount: '6',
  }, {
    key: uuid(),
    name: 'Shopping Item2',
    unit: 'na',
    image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg',
    brand:'na',
    description:'na',
    remaining:'Low',
    amount: '11',
  }, {
    key: uuid(),
    name: 'Shopping Item3',
    unit: 'na',
    image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg',
    brand:'na',
    description:'na',
    remaining:'Low',
    amount: '1',
  }],
  suggested: [{
    key: uuid(),
    name: 'Suggested Item1',
    unit: 'na',
    image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg',
    brand:'na',
    description:'na',
    remaining:'Low',
    amount: '3',
  }, {
    key: uuid(),
    name: 'Suggested Item2',
    unit: 'na',
    image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg',
    brand:'na',
    description:'na',
    remaining:'Low',
    amount: '2',
  }, 
  ], */
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
      image:action.image
     }],
   }),
   [EDIT_ITEM]: (state, action) => ({
    ...state,
    list: state.list.map((item) => item.key === action.key ? ({
      ...item,
      name: action.name,
      info: action.info,
      amount: action.amount,
      unit: action.unit,
      image: action.image,
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
  [ADD_SUGGESTED_ITEM]: (state, action) => ({
    ...state,
    suggested: [...state.suggested, {
      key: action.key,
      name: action.name,
      info: action.info,
      amount: action.amount,
      units: action.units,
      image: action.image,
     }],
  }),
  [DELETE_SUGGESTED_ITEM]: (state, action) => ({
    ...state,
    suggested: state.suggested.filter(({ key }) => key !== action.key),
  }),
  DELETE_ITEMS: (state, action) => ({
    ...state,
    list: list.filter(({ key }) => action.keys.indexOf(key) === -1),
  }),
  [ADD_FROM_SUGGESTED_TO_LIST]: (state, action) => ({
    ...state,
    list: [...state.list, state.suggested.find(({ key }) => key === action.key)],
    suggested: state.suggested.filter(({ key }) => key !== action.key),
  }),
  [CLEAR_SUGGESTED_ITEMS]: (state) => ({
    ...state,
    suggested: [],
  }),
  [ADD_ALL_SUGGESTED_TO_LIST]: (state) => ({
    ...state,
    list: [...state.list, ...state.suggested],
    suggested: [],
  }),
  [UPDATE_SUGGESTED_ITEM]: (state, action) => ({
    ...state,
    suggested: state.suggested.map(( ingredient ) => (ingredient.key === action.key) ? {
      key: action.key,
      name: action.name,
      info: action.info,
      amount: action.amount,
      units: action.units,
      remaining: action.remaining,
      image: action.image,
     } : ingredient ),
  }),

};

// boilerplate
export default function (state = INITIAL_STATE, action) {
  if (reducers[action.type]) {
    return reducers[action.type](state, action);
  }

  return state;
};
