
export const ADD_ITEM = 'list/add_item';
export const DELETE_ITEM = 'list/delete_item';
export const EDIT_ITEM = 'list/edit_item';
export const DELETE_ITEMS = 'list/delete_items';
export const CLEAR_SHOPPING_LIST = 'list/clear_shopping_list';
export const ADD_FROM_SUGGESTED_TO_LIST = 'list/add_from_suggested_to_list';
export const ADD_ALL_SUGGESTED_TO_LIST = 'list/add_all_suggested_to_list';
export const DELETE_SELECTED_ITEMS = '/list/delete_selected_items';
export const SELECT_ALL_ITEMS = '/list/select_all_items';
export const UNSELECT_ALL_ITEMS = '/list/unselect_all_items';

export const addItem = ({ key, amount, name, unit, image, brand, description, remaining }) => ({ // adds custom item created by user to list
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

export const editItem = ({ key, amount, name, unit, image, brand, description, remaining, checked }) => ({ // edits/updates item in list
  type: EDIT_ITEM,
  key,
  amount,
  name,
  description,
  unit,
  image,
  brand,
  remaining,
  checked,
});

export const deleteItem = (key) => ({ // deletes item from list
  type: DELETE_ITEM,
  key,
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

export const deleteSelectedItems = () => ({ // deletes all items that are selected
  type: DELETE_SELECTED_ITEMS,
});

export const clearShoppingList = () => ({ // deletes all items from shopping list
  type: CLEAR_SHOPPING_LIST,
});

export const moveSuggestedToList = ({ key, amount, name, unit, image, brand, description, remaining, expirationDate }) => ({ // adds a suggested item to list
  type: ADD_FROM_SUGGESTED_TO_LIST,
  key,
  amount,
  name,
  description,
  unit,
  image,
  brand,
  remaining,
  expirationDate,
});

export const moveAllSuggested = () => ({ // adds all suggested items to list
  type: ADD_ALL_SUGGESTED_TO_LIST,
});


export const selectAllItems = () => ({ // selects all list items
  type: SELECT_ALL_ITEMS,

});

export const unselectAllItems = () => ({ // deselects all list items
  type: UNSELECT_ALL_ITEMS, 

});

/**
 * *****Note: Suggested items will not be stored with redux, so the suggested state has been deleted.
 */
const INITIAL_STATE = {
  list: [],

};


const reducers = {
  [ADD_ITEM]: (state, action) => ({ 
    ...state,
    list: [...state.list, {
      key: action.key,
      name: action.name,
      amount: action.amount,
      description: action.description,
      brand: action.brand,
      unit: action.unit,
      image: action.image,
      checked: false,
    }],
  }),
  [EDIT_ITEM]: (state, action) => ({
    ...state,
    list: state.list.map((item) => item.key === action.key ? ({
      ...item,
      name: action.name,
      amount: action.amount,
      unit: action.unit,
      checked: action.checked,
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
  DELETE_ITEMS: (state, action) => ({
    ...state,
    list: list.filter(({ key }) => action.keys.indexOf(key) === -1),
  }),
  [ADD_FROM_SUGGESTED_TO_LIST]: (state, action) => ({
    ...state,
    list: [...state.list, {
      key: action.key,
      name: action.name,
      description: action.description,
      amount: action.amount,
      unit: action.unit,
      image: action.image,
      checked: false,
      brand: action.brand,
      remaining: action.remaining,
      expirationDate: action.expirationDate,
    }],
  }),
  [DELETE_SELECTED_ITEMS]: (state) => ({
    ...state,
    list: state.list.filter((item) => (item.checked !== true)),
  }),
  [SELECT_ALL_ITEMS]: (state) => ({
    ...state,
    list: state.list.map((item) => ({
      ...item,
      checked: true,
    })),
  }),
  [UNSELECT_ALL_ITEMS]: (state) => ({
    ...state,
    list: state.list.map((item) => ({
      ...item,
      checked: false,
    })),
  }),
 
};

// boilerplate
export default function (state = INITIAL_STATE, action) {
  if (reducers[action.type]) {
    return reducers[action.type](state, action);
  }

  return state;
};
