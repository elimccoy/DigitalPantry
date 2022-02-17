import qs from 'qs';
import CONFIG from '../config';

const spoonacularApiHeaders = CONFIG.spoonacularApi;
const BASE_URL = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com';

async function foodApiFetch (url, params) {
  const finalURL = BASE_URL + url + qs.stringify(params, {
    addQueryPrefix: true,
  });

  const res = await fetch(finalURL, {
    headers: {
      'Content-Type': 'application/json',
      ...spoonacularApiHeaders,
    },
  });

  if (process.env.NODE_ENV === 'development') {
    console.log(`Request headers for ${finalURL}`)
    console.log('x-ratelimit-requests-remaining', res.headers.map['x-ratelimit-requests-remaining']);
    console.log('x-ratelimit-requests-reset', res.headers.map['x-ratelimit-requests-reset']);
    console.log('x-ratelimit-results-remaining', res.headers.map['x-ratelimit-results-remaining']);
    console.log('x-ratelimit-results-reset', res.headers.map['x-ratelimit-results-reset']);
  }

  if (res.ok) {
    return await res.json();
  } else {
    throw await res.text();
  }
}

/**
 * Search through hundreds of thousands of recipes using advanced filtering and ranking.
 * full reference for params: https://spoonacular.com/food-api/docs#Search-Recipes-Complex
 * @param {object} params - the paramaters to pass to the API
 * @param {string} params.ingredients
 * @param {boolean} params.ignorePantry
 */
export async function fetchRecipesByIngredients(params) {
  return foodApiFetch('/recipes/findByIngredients', params);
}

/**
 * Search through hundreds of thousands of recipes using advanced filtering and ranking.
 * full reference for params: https://spoonacular.com/food-api/docs#Search-Recipes-Complex
 * @param {object} params - the paramaters to pass to the API
 * @param {string} params.query
 * @param {string} params.excludeIngredients
 * @param {string} params.intolerances
 * @param {number} params.number
 * @param {number} params.offset
 * @param {string} params.type
 * @param {string} params.cuisine
 */
export async function fetchRecipesByName(params) {
  return await foodApiFetch('/recipes/search', params);
};

/**
 * Fetches recipe information
 * @param {object} params - the paramaters to pass to the API
 * @param {boolean} params.includeNutrition
 */
export async function fetchRecipeInfo(id, params) {
  return await foodApiFetch(`/recipes/${id}/information`, params);
};
