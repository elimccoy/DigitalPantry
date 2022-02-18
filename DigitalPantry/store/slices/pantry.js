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
    name: '365 Everyday Value, Crinkle Cut French Fries No Salt Added',
    key: '099482400705',
    unit: 'Bag',
    amount: '5',
    image: 'https://images-na.ssl-images-amazon.com/images/I/5138t4a4fDL._SL150_.jpg',
    brand:'365 Everyday Value',
    description:'Unknown',
    remaining:'Full' ,
    expirationDate: new Date(),
    category: 'Test Category 1',
  }, {
    name: 'FLATOUT Flatbread - Thin Pizza Crust RUSTIC WHITE',
    key: '601133100843',
    unit: 'Pack',
    amount: '2',
    image: 'https://images-na.ssl-images-amazon.com/images/I/51hSnX3rQ4L._SL150_.jpg',
    brand:'Flatout',
    description:'Unknown',
    remaining:'Full',
    expirationDate: new Date(),
    category: 'Test Category 1',
  }, {
    name: 'Kelloggs Pop-Tarts SMores, 8 ct',
    key: '038000321108',
    unit: 'Bag',
    amount: '8',
    image: 'https://images-na.ssl-images-amazon.com/images/I/61fJBMQzNBL._SL150_.jpg',
    brand:'Kelloggs',
    description:'Unknown',
    remaining:'Full',
    expirationDate: new Date(),
    category: 'Test Category 1',
  }, {
    name: 'Froot Loops Kelloggs Loops Cereal with Reclosable Bag',
    key: '038000144264',
    unit: 'Box',
    amount: '1',
    image: 'https://images-na.ssl-images-amazon.com/images/I/61NFtuLI5GL._SL150_.jpg',
    brand:'Kelloggs',
    description:'Unknown',
    remaining:'Full',
    expirationDate: new Date(),
    category: 'Test Category 1',
  }, {
    name: 'Katz Gluten Free Poppy Seed Bagels',
    key: '893536002880',
    unit: 'Box',
    amount: '1',
    image: 'https://images-na.ssl-images-amazon.com/images/I/51-UbicEqyL._SL150_.jpg',
    brand:'Katz Gluten Free',
    description:'Unknown',
    remaining:'Full',
    expirationDate: new Date(),
    category: 'Test Category 1',
  }, {
    name: 'Randys Pickles Sideburns Grilled Pickles',
    key: '869682000063',
    unit: 'Jar',
    amount: '6',
    image: 'https://images-na.ssl-images-amazon.com/images/I/41QTy4DddzL._SL150_.jpg',
    brand:'Randys Pickles',
    description:'Unknown',
    remaining:'Full',
    expirationDate: new Date(),
    category: 'Test Category 2',
  }, {
    name: 'Lays Doritos Salsa Verde',
    key: '028400613941',
    unit: 'Pack',
    amount: '8',
    image: 'https://images-na.ssl-images-amazon.com/images/I/41JAnClzMKL._SL150_.jpg',
    brand:'Lays',
    description:'Unknown',
    remaining:'Full',
    expirationDate: new Date(),
    category: 'Test Category 2',
  }, {
    name: 'Nutty Novelties Chocolate Peanut Butter - High Protein',
    key: '685646120192',
    unit: 'Jar',
    amount: '20',
    image: 'https://images-na.ssl-images-amazon.com/images/I/51h-YWtqWZL._SL150_.jpg',
    brand:'Nutty Novelties',
    description:'Unknown',
    remaining:'Full',
    expirationDate: new Date(),
    category: 'Test Category 2',
  }, {
    name: 'GREENBOW Manuka Honey with Organic Fresh Royal Jelly',
    key: '761734990448',
    unit: 'Jar',
    amount: '3',
    image: 'https://images-na.ssl-images-amazon.com/images/I/41lS6Zn9UKL._SL150_.jpg',
    brand:'Greenbow',
    description:'Unknown',
    remaining:'Full',
    expirationDate: new Date(),
    category: 'Test Category 2',
  }, {
    name: 'Garden Greens Celery Power Organic Celery Juice Powder',
    key: '035046113476',
    unit: 'Pack',
    amount: '1',
    image: 'https://m.media-amazon.com/images/I/41nSkQe3IlL._SL150_.jpg',
    brand:'Garden Greens',
    description:'Unknown',
    remaining:'Full',
    expirationDate: new Date(),
    category: 'Test Category 2',
  }, {
    name: 'STOPLIGHT BELL PEPPERS GREEN, RED & YELLOW',
    key: '639785314103',
    unit: 'Grams',
    amount: '600',
    image: 'https://images-na.ssl-images-amazon.com/images/I/41CmPoae-jL._SL150_.jpg',
    brand:'Neighborhood Corner Store',
    description:'Unknown',
    remaining:'Full',
    expirationDate: new Date(),
    category: 'Test Category 3',
  }, {
    name: 'Tony Romas Chicken Jerky Bites, Gluten Free',
    key: '813592015914',
    unit: 'Bag',
    amount: '3',
    image: 'https://m.media-amazon.com/images/I/51VMmY2evZL._SL150_.jpg',
    brand:'Tony Romas',
    description:'Unknown',
    remaining:'Full',
    expirationDate: new Date(),
    category: 'Test Category 3',
  }, {
    name: 'Rosarita New Rf Beans 30 Oz (12-Pack) ',
    key: '044300106376',
    unit: 'Can',
    amount: '20',
    image: 'https://images-na.ssl-images-amazon.com/images/I/41CaWzbHwhL._SL150_.jpg',
    brand:'Rosarita',
    description:'Unknown',
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
