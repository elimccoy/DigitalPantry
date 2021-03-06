export const CREATE_RECIPE = 'recipes/create';
export const DELETE_RECIPE = 'recipes/delete';
export const EDIT_RECIPE = 'recipes/edit';
export const SAVE_RECIPE = 'recipes/save';
export const SET_SAVED_RECIPES = 'recipes/set_saved_recipes';

export const createRecipe = ({
  id, // must come from fiebase
  title,
  ingredients,
  steps,
  category,
  imageURL,
}) => ({
  type: CREATE_RECIPE,
  id,
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

export const setSavedRecipes = (recipes) => ({
  type: SET_SAVED_RECIPES,
  recipes,
});

const INITIAL_STATE = {
  categories: [/*{
    name: string
  }*/],
  // List of categories of saved recipes
  saved: [/*{
    id: string - comes from firebase
    title: string,
    ingredients: array<string>,
    steps: array<string>,
  }*/],
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
      imageURL: action.imageURL,
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
  [SET_SAVED_RECIPES]: (state, action) => ({
    ...state,
    saved: action.recipes,
    // Create a list of categories from the list of recipes
    // Filters to array of strings to make it easy to filter with onlyUnique then converts to array of objects
    categories: action.recipes
      .map((r) => r.category)
      .filter(onlyUnique).map((r) => ({
        name: r,
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

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
