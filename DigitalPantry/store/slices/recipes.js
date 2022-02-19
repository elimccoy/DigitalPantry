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
}) => ({
  type: CREATE_RECIPE,
  id: uuid(), // generate a random uuidv4 random id
  category,
  title,
  ingredients,
  steps,
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
    posterUrl: "https://cdn2.vectorstock.com/i/thumb-large/48/06/image-preview-icon-picture-placeholder-vector-31284806.jpg",
  }, {
    id: uuid(),
    category: 'Breakfasts',
    title: 'Recipe 2',
    posterUrl: "https://cdn2.vectorstock.com/i/thumb-large/48/06/image-preview-icon-picture-placeholder-vector-31284806.jpg",
  }, {
    id: uuid(),
    category: 'Breakfasts',
    title: 'Recipe 3',
    posterUrl: "https://cdn2.vectorstock.com/i/thumb-large/48/06/image-preview-icon-picture-placeholder-vector-31284806.jpg",
  }, {
    id: uuid(),
    category: 'Breakfasts',
    title: 'Recipe 4',
    posterUrl: "https://cdn2.vectorstock.com/i/thumb-large/48/06/image-preview-icon-picture-placeholder-vector-31284806.jpg",
  }, {
    id: uuid(),
    category: 'Lunches',
    title: 'Recipe 5',
    posterUrl: "https://cdn2.vectorstock.com/i/thumb-large/48/06/image-preview-icon-picture-placeholder-vector-31284806.jpg",
  }, {
    id: uuid(),
    category: 'Lunches',
    title: 'Recipe 6',
    posterUrl: "https://cdn2.vectorstock.com/i/thumb-large/48/06/image-preview-icon-picture-placeholder-vector-31284806.jpg",
  }, {
    id: uuid(),
    category: 'Lunches',
    title: 'Recipe 7',
    posterUrl: "https://cdn2.vectorstock.com/i/thumb-large/48/06/image-preview-icon-picture-placeholder-vector-31284806.jpg",
  }, {
    id: uuid(),
    category: 'Lunches',
    title: 'Recipe 8',
    posterUrl: "https://cdn2.vectorstock.com/i/thumb-large/48/06/image-preview-icon-picture-placeholder-vector-31284806.jpg",
  }, {
    id: uuid(),
    category: 'Soups',
    title: 'Recipe 9',
    posterUrl: "https://cdn2.vectorstock.com/i/thumb-large/48/06/image-preview-icon-picture-placeholder-vector-31284806.jpg",
  }, {
    id: uuid(),
    category: 'Soups',
    title: 'Recipe 10',
    posterUrl: "https://cdn2.vectorstock.com/i/thumb-large/48/06/image-preview-icon-picture-placeholder-vector-31284806.jpg",
  }, {
    id: uuid(),
    category: 'Soups',
    title: 'Recipe 11',
    posterUrl: "https://cdn2.vectorstock.com/i/thumb-large/48/06/image-preview-icon-picture-placeholder-vector-31284806.jpg",
  }, {
    id: uuid(),
    category: 'Soups',
    title: 'Recipe 12',
    posterUrl: "https://cdn2.vectorstock.com/i/thumb-large/48/06/image-preview-icon-picture-placeholder-vector-31284806.jpg",
  }, {
    id: uuid(),
    category: 'American',
    title: 'Recipe 13',
    posterUrl: "https://cdn2.vectorstock.com/i/thumb-large/48/06/image-preview-icon-picture-placeholder-vector-31284806.jpg",
  }, {
    id: uuid(),
    category: 'American',
    title: 'Recipe 14',
    posterUrl: "https://cdn2.vectorstock.com/i/thumb-large/48/06/image-preview-icon-picture-placeholder-vector-31284806.jpg",
  }, {
    id: uuid(),
    category: 'American',
    title: 'Recipe 15',
    posterUrl: "https://cdn2.vectorstock.com/i/thumb-large/48/06/image-preview-icon-picture-placeholder-vector-31284806.jpg",
  }, {
    id: uuid(),
    category: 'American',
    title: 'Recipe 16',
    posterUrl: "https://cdn2.vectorstock.com/i/thumb-large/48/06/image-preview-icon-picture-placeholder-vector-31284806.jpg",
  }],
};

const reducers = {
  [CREATE_RECIPE]: (state, action) => ({
    ...state,
    // add the recipe
    saved: [{
      id: action.id,
      category: action.category,
      title: action.name,
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