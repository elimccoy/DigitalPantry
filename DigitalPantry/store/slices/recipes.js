import { v4 as uuid } from 'uuid';

const placeholderImage = require('../../assets/recipePlaceholder.png');

export const CREATE_RECIPE = 'recipes/create';
export const DELETE_RECIPE = 'recipes/delete';
export const EDIT_RECIPE = 'recipes/edit';
export const SAVE_RECIPE = 'recipes/save';

export const createRecipe = ({
  title,
  ingredients,
  steps,
  category,
  posterUrl,
}) => ({
  type: CREATE_RECIPE,
  id: uuid(), // generate a random uuidv4 random id
  category,
  title,
  ingredients,
  steps,
  posterUrl,
});

export const deleteRecipe = (id) => ({
  type: DELETE_NOTIFICATION,
  id,
});

export const saveRecipe = (id) => ({
  type: DELETE_NOTIFICATION,
  id,
});

const INITIAL_STATE = {
  categories: [{
    name: 'Breakfasts',
  }, {
    name: 'Lunches',
  }, {
    name: 'Soups',
  }, {
    name: 'American',
  }],
  // List of categories of saved recipes
  saved: [{
    id: uuid(),
    category: 'Breakfasts',
    title: 'Recipe 1',
    posterUrl: placeholderImage,
  }, {
    id: uuid(),
    category: 'Breakfasts',
    title: 'Recipe 2',
    posterUrl: placeholderImage,
  }, {
    id: uuid(),
    category: 'Breakfasts',
    title: 'Recipe 3',
    posterUrl: placeholderImage,
  }, {
    id: uuid(),
    category: 'Breakfasts',
    title: 'Recipe 4',
    posterUrl: placeholderImage,
  }, {
    id: uuid(),
    category: 'Lunches',
    title: 'Recipe 5',
    posterUrl: placeholderImage,
  }, {
    id: uuid(),
    category: 'Lunches',
    title: 'Recipe 6',
    posterUrl: placeholderImage,
  }, {
    id: uuid(),
    category: 'Lunches',
    title: 'Recipe 7',
    posterUrl: placeholderImage,
  }, {
    id: uuid(),
    category: 'Lunches',
    title: 'Recipe 8',
    posterUrl: placeholderImage,
  }, {
    id: uuid(),
    category: 'Soups',
    title: 'Recipe 9',
    posterUrl: placeholderImage,
  }, {
    id: uuid(),
    category: 'Soups',
    title: 'Recipe 10',
    posterUrl: placeholderImage,
  }, {
    id: uuid(),
    category: 'Soups',
    title: 'Recipe 11',
    posterUrl: placeholderImage,
  }, {
    id: uuid(),
    category: 'Soups',
    title: 'Recipe 12',
    posterUrl: placeholderImage,
  }, {
    id: uuid(),
    category: 'American',
    title: 'Recipe 13',
    posterUrl: placeholderImage,
  }, {
    id: uuid(),
    category: 'American',
    title: 'Recipe 14',
    posterUrl: placeholderImage,
  }, {
    id: uuid(),
    category: 'American',
    title: 'Recipe 15',
    posterUrl: placeholderImage,
  }, {
    id: uuid(),
    category: 'American',
    title: 'Recipe 16',
    posterUrl: placeholderImage,
  }],
};

const reducers = {
  [CREATE_RECIPE]: (state, action) => ({
    ...state,
    // add the recipe
    saved: [{
      id: action.id,
      category: action.category,
      title: action.title,
      ingredients: action.ingredients,
      steps: action.steps,
      posterUrl: action.posterUrl || placeholderImage,
    }, ...state.saved],
    // automatically create the category if it doesn't exist
    categories: state.categories.find((c) => c.name === action.category)
      ? state.categories
      : [...state.categories, {
        name: action.category,
      }],
  }),
  [DELETE_RECIPE]: (state, action) => ({
    ...state,
    saved: state.saved.filter(({ id }) => id !== action.id),
  }),
};

// boilerplate
export default function (state = INITIAL_STATE, action) {
  if (reducers[action.type]) {
    return reducers[action.type](state, action);
  }

  return state;
};