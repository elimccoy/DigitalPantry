
import { doc, collection, getDoc, setDoc, getDocs, query, where, addDoc } from 'firebase/firestore';
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

const RecipesRef = collection(db, 'Recipes');

/**
 * Fetches recipes from the database based on the provided userId
 * @param {string} userId - represents the user id of the user according to the Users/ table
 * @returns {Promise} - Promise resolved when the fetch is complete.
 */
export async function fetchSavedRecipes(userId) {
  console.log(21, userId);
  try {
    return (await getDocs(query(RecipesRef, where('userId', '==', userId)))).docs
      .map((recipe) => ({
        id: recipe.id,
        ...recipe.data(),
      }));
  } catch (e) {
    console.error('Error fetching recipes', e);
  }
};

/**
 * Saves a recipe to the database
 * @param {string} userId - represents the user id of the user according to the Users/ table
 * @param {*} recipe - the recipe object. This is the exact data that will be saved to the database.
 * @returns {promise} - Promise that can be resolved to handle when the save is complete
 */
export async function saveRecipe(userId, recipe) {
  try {
    return await addDoc(RecipesRef, {
      userId,
      ...recipe,
    });
  } catch (e) {
    console.error('Error saving recipes', e);
  }
};

/**
 * Util helper function to take an object and filter out the keys that are undefined.
 */
const filterUndefined = (obj) => Object.keys(obj).reduce((acc, key) => {
  const _acc = acc;
  if (obj[key] !== undefined) _acc[key] = obj[key];
  return _acc;
}, {});


/**
 * Edits a recipe in the database
 * @param {string} userId - represents the user id of the user according to the Users/ table
 * @param {*} recipe - the recipe object. This is the exact data that will be saved to the database.
 * @returns {promise} - Promise that can be resolved to handle when the save is complete
 */
export async function editRecipe(userId, recipe) {
  try {
    const recipeRef = doc(db, 'Recipes', recipe.id);
    const snapshot = await getDoc(recipeRef);

    return await setDoc(recipeRef, filterUndefined({
      ...snapshot.data(),
      ...recipe,
    }));
  } catch (e) {
    console.error('Error saving recipes', e);
  }
};

/**
 * Creates the user if they don't exist and returns the user based on the user auth data.
 * @param {object} userAuth - this comes from the first argument inside auth.onAuthStateChanged
 * @returns the user document
 */
export const generateUserDocument = async (userAuth) => {
  if (!userAuth) {
    console.error('No user provided to save');
    return;
  };

  const userRef = doc(db, 'Users', userAuth.uid);
  const snapshot = await getDoc(userRef);

  // Initially creates user if they don't exist in the database.
  if (!snapshot.exists()) {
    const { email, displayName, photoURL } = userAuth;

    try {
      const u = {
        displayName,
        email,
        photoURL,
      };

      await setDoc(userRef, u);
    } catch (error) {
      console.error('Error creating user document', error);
    }
  }

  const userDocument = await getUserDocument(userAuth.uid);
  return {
    ...userDocument,
    ...userAuth.providerData[0],
  }
};

/**
 * Queries for a user in the database
 * @param {string} uid - The id for the user authenticated, not in the database.
 * @returns the user document
 */
const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userRef = doc(db, 'Users', uid);
    const userDocument = await getDoc(userRef);

    return {
      id: userDocument.id,
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};