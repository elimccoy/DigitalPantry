// https://redux.js.org/tutorials/essentials/part-1-overview-concepts

// template for actions. This is to enforce constants so that you don't make a mistake mispelling an action name.
// export const <ACTION NAME> = 'pantry/<action name>';

// template for action creators. This helps you create actions based on the arguments. Replace <arg1> and such with the necessary args.
// Import these to use in store.dispatch(<action name>) to dispatch actions.
// export const <action name> = (<arg1>, <arg2>, ...) => ({
//   type: <ACTION NAME>,
//   arg1: arg1,
//   arg2: arg2,
//   ...
// })

export const CREATE_ITEM = 'pantry/create';
export const DELETE_ITEM = 'pantry/delete';
export const UPDATE_ITEM = 'pantry/update';

export const createItem = (props) => ({
  type: CREATE_ITEM,
  ...props,
});

export const deleteItem = (key) => ({
  type: DELETE_ITEM,
  key,
});

export const updateItem = (props) => ({
  type: UPDATE_ITEM,
  ...props,
})

const INITIAL_STATE = {
  ingredients: [/*{
    name: Name of the pantry item,
    key: Unique UPC,
    unit: Measurement,
    amount: Amount of units,
    image: Image URI,
    brand: Brand of pantry item,
    description: API desc of item,
    remaining: Amout remaining ,
    expirationDate: Expiration Date,
    Category: category for sorting pantry items.
  }*/
  {
    name: 'name1',
    key: 'Test_Data_1',
    unit: 'na',
    amount: 'na',
    image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg',
    brand:'na',
    description:'na',
    remaining:'Full' ,
    expirationDate: new Date(),
    category: 'Test Category 1',
  }, {
    name: 'name2',
    key: 'Test_Data_2',
    unit: 'na',
    amount: 'na',
    image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg',
    brand:'na',
    description:'na',
    remaining:'Full',
    expirationDate: new Date(),
    category: 'Test Category 1',
  }, {
    name: 'name3',
    key: 'Test_Data_3',
    unit: 'na',
    amount: 'na',
    image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg',
    brand:'na',
    description:'na',
    remaining:'Full',
    expirationDate: new Date(),
    category: 'Test Category 1',
  }, {
    name: 'name4',
    key: 'Test_Data_4',
    unit: 'na',
    amount: 'na',
    image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg',
    brand:'na',
    description:'na',
    remaining:'Full',
    expirationDate: new Date(),
    category: 'Test Category 1',
  }, {
    name: 'name5',
    key: 'Test_Data_5',
    unit: 'na',
    amount: 'na',
    image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg',
    brand:'na',
    description:'na',
    remaining:'Full',
    expirationDate: new Date(),
    category: 'Test Category 1',
  }, {
    name: 'name6',
    key: 'Test_Data_6',
    unit: 'na',
    amount: 'na',
    image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg',
    brand:'na',
    description:'na',
    remaining:'Full',
    expirationDate: new Date(),
    category: 'Test Category 2',
  }, {
    name: 'name7',
    key: 'Test_Data_7',
    unit: 'na',
    amount: 'na',
    image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg',
    brand:'na',
    description:'na',
    remaining:'Full',
    expirationDate: new Date(),
    category: 'Test Category 2',
  }, {
    name: 'name8',
    key: 'Test_Data_8',
    unit: 'na',
    amount: 'na',
    image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg',
    brand:'na',
    description:'na',
    remaining:'Full',
    expirationDate: new Date(),
    category: 'Test Category 2',
  }, {
    name: 'name9',
    key: 'Test_Data_9',
    unit: 'na',
    amount: 'na',
    image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg',
    brand:'na',
    description:'na',
    remaining:'Full',
    expirationDate: new Date(),
    category: 'Test Category 2',
  }, {
    name: 'name10',
    key: 'Test_Data_10',
    unit: 'na',
    amount: 'na',
    image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg',
    brand:'na',
    description:'na',
    remaining:'Full',
    expirationDate: new Date(),
    category: 'Test Category 2',
  }, {
    name: 'name11',
    key: 'Test_Data_11',
    unit: 'na',
    amount: 'na',
    image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg',
    brand:'na',
    description:'na',
    remaining:'Full',
    expirationDate: new Date(),
    category: 'Test Category 3',
  }, {
    name: 'name12',
    key: 'Test_Data_12',
    unit: 'na',
    amount: 'na',
    image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg',
    brand:'na',
    description:'na',
    remaining:'Full',
    expirationDate: new Date(),
    category: 'Test Category 3',
  }, {
    name: 'name13',
    key: 'Test_Data_13',
    unit: 'na',
    amount: 'na',
    image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg',
    brand:'na',
    description:'na',
    remaining:'Full',
    expirationDate: new Date(),
    category: 'Test Category 3',
  }],
};

const reducers = {
  /**
   * reducer template: replace name with the action name
   * as seen here: https://github.com/coder13/LetsCube/blob/master/client/src/store/chat/reducer.js
   * [<action name>]: (state, action) => ({
   *   ...state,
   * })
   * */
   [CREATE_ITEM]: (state, action) => ({
    ...state,
    ingredients: state.ingredients.find((i) => (i.key === action.key)) ? state.ingredients : [{
      name: action.name,
      key: action.key,
      unit: action.unit,
      amount: action.amount,
      image: action.image,
      brand: action.brand,
      description: action.description,
      remaining: action.remaining,
      expirationDate: action.expirationDate,
      category: action.category,
    }, ...state.ingredients],
  }),
  [DELETE_ITEM]: (state, action) => ({
    ...state,
    ingredients: state.ingredients.filter(({ key }) => key !== action.key),
  }),
  [UPDATE_ITEM]: (state, action) => ({
    ...state,
    ingredients: state.ingredients.map((i) => (i.key === action.key ? {
      name: action.name,
      key: action.key,
      unit: action.unit,
      amount: action.amount,
      image: action.image,
      brand: action.brand,
      description: action.description,
      remaining: action.remaining,
      expirationDate: action.expirationDate,
      category:action.category,
    } : i)),
  }),
};

// boilerplate
export default function (state = INITIAL_STATE, action) {
  if (reducers[action.type]) {
    return reducers[action.type](state, action)
  }

  return state;
};
