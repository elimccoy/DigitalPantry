import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'
import { db } from '../firebase';

export async function loggingOut() {
  const auth = getAuth();
  auth.signOut().then(function() {
    // Sign-out successful.
  }, function(error) {
    // An error happened.
  });
};

const RecipesRef = collection(db, 'Recipes')

// Following recipes are agnostic to the current logged in user and the userId should be passed into these functions

// adds recipe to firestore database
export async function fetchSavedRecipes(userId) {
  try {
    return getDocs(query(RecipesRef, where('userId', '==', userId)));
  } catch (e) {
    console.error('Error fetching recipes', e);
  }
}

export async function saveRecipe(userId, recipe) {
  try {
    const ref = await addDoc(RecipesRef, {
      userId: userId,
      name: recipe.name,
      ingredients: recipe.ingredients,

    })
  } catch (e) {
    console.error('Error saving recipes', e);
  }
}