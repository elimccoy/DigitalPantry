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
  imageURL,
}) => ({
  type: CREATE_RECIPE,
  id: uuid(), // generate a random uuidv4 random id
  category,
  title,
  ingredients,
  steps,
  imageURL,
});

export const deleteRecipe = (id) => ({
  type: DELETE_RECIPE,
  id,
});

export const saveRecipe = (id) => ({
  type: SAVE_RECIPE,
  id,
});

export const editRecipe = (recipeData) => ({
  type: EDIT_RECIPE,
  id: recipeData.id, // Make sure this is defined
  ...recipeData,
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
    imageURL: placeholderImage,
  }, {
    id: uuid(),
    category: 'Breakfasts',
    title: 'Recipe 2',
    imageURL: placeholderImage,
  }, {
    id: uuid(),
    category: 'Breakfasts',
    title: 'Recipe 3',
    imageURL: placeholderImage,
  }, {
    id: uuid(),
    category: 'Breakfasts',
    title: 'Recipe 4',
    imageURL: placeholderImage,
  }, {
    id: uuid(),
    category: 'Lunches',
    title: 'Recipe 5',
    imageURL: placeholderImage,
  }, {
    id: uuid(),
    category: 'Lunches',
    title: 'Recipe 6',
    imageURL: placeholderImage,
  }, {
    id: uuid(),
    category: 'Lunches',
    title: 'Recipe 7',
    imageURL: placeholderImage,
  }, {
    id: uuid(),
    category: 'Lunches',
    title: 'Recipe 8',
    imageURL: placeholderImage,
  }, {
    id: uuid(),
    category: 'Soups',
    title: 'Recipe 9',
    imageURL: placeholderImage,
  }, {
    id: uuid(),
    category: 'Soups',
    title: 'Recipe 10',
    imageURL: placeholderImage,
  }, {
    id: uuid(),
    category: 'Soups',
    title: 'Recipe 11',
    imageURL: placeholderImage,
  }, {
    id: uuid(),
    category: 'Soups',
    title: 'Recipe 12',
    imageURL: placeholderImage,
  }, {
    id: uuid(),
    category: 'American',
    title: 'Recipe 13',
    imageURL: placeholderImage,
  }, {
    id: uuid(),
    category: 'American',
    title: 'Recipe 14',
    imageURL: placeholderImage,
  }, {
    id: uuid(),
    category: 'American',
    title: 'Recipe 15',
    imageURL: placeholderImage,
  }, {
    id: uuid(),
    category: 'American',
    title: 'Recipe 16',
    imageURL: placeholderImage,
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
      imageURL: action.imageURL || placeholderImage,
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
  [EDIT_RECIPE]: (state, action) => ({
    ...state,
    saved: state.saved.map((recipe) => recipe.id === action.id ? ({
      ...recipe,
      title: action.title || recipe.title,
      category: action.category || recipe.category,
      ingredients: action.ingredients || recipe.ingredients,
      steps: action.steps || recipe.steps,
      imageURL: action.imageURL || recipe.imageURL,
    }) : recipe),
  }),
};

// boilerplate
export default function (state = INITIAL_STATE, action) {
  if (reducers[action.type]) {
    return reducers[action.type](state, action);
  }

  return state;
};