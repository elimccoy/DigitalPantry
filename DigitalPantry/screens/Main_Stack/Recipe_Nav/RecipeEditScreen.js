
/**
 * Name: RecipeEditScreen.js
 * Desc: React native screen that allows the user to edit an existing recipe.
 * File type: Screen
*/

import { useState, useCallback } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, TextInput } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import IOSAccessory from './IOSAccessory';
import { editRecipe as firebaseEditRecipe } from '../../../API/firebaseMethods';
import { editRecipe, deleteRecipe } from '../../../store/slices/recipes';
import { getUser } from '../../../UserProvider';
import { MeasurementList } from './util';

// Platform selection: checks for ios or android platform, used in Accessory component.
const Accessory = Platform.select({
  ios: IOSAccessory,
});

// Main screen function
const RecipeEditScreen = ({ route, navigation }) => {

  // Gets user information and data, establishes dispatch for firebase data.
  const user = getUser();
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipes.saved.find((item) => (item.id === route.params.id)));
  const categories = useSelector((state) => state.recipes.categories.map(({ name }) => ({
    label: name,
    value: name,
  })));

  console.log(recipe.ingredients);

  // Recipe information:
  /*
  recipeName: string
  recipeInfo: string
  ingredients: object list
    object info:
      ingName: string
      ingCount: string
      ingUnit: string
      unitDisp: bool

      unitDisp is used to display or hide the unit dropdown

  ingredients is mapped to the screen, it is referenced to display a new ingredient data component
  for each present ingredient object in the list

  Differs from recipe add screen only in intial values
  */
  const [ recipeName, onChangeName ] = useState(recipe.title);
  const [ recipeInfo, onChangeRecipe ] = useState(recipe.steps || '');

  // Category selector: assigns category on saved recipe screen
  const [ category, onChangeCategory ] = useState(recipe.category || 'Default');
  const [ categoryDropDownVisibile, setCategoryDropDownVisibile ] = useState(false);
  const [ingredients, addIngredient] = useState(recipe.ingredients || [
    { ingName: '', ingCount: '', ingUnit: '', unitDisp: false },
  ]);

  /*
  Functions for updating individual ingredient info.
  Information is mapped to a dynamic list of components, each must be updated independently.
  */
  const updateIngDataName = (i, event) => {
    const values = [...ingredients];
    values[i].ingName = event;
    addIngredient(values);
  }
  const updateIngDataCount = (i, event) => {
    const values = [...ingredients];
    values[i].ingCount = event;
    addIngredient(values);
  }
  const updateIngDataUnit = (i, event) => {
    const values = [...ingredients];
    values[i].ingUnit = event;
    addIngredient(values);
  }

  const updateIngUnitDisp = (i, event) => {
    const values = [...ingredients];
    values[i].unitDisp = event;
    addIngredient(values);
  }

  const addIngredients = () => {
    addIngredient([...ingredients, { ingName: '', ingCount: '', ingUnit: '', unitDisp: false }]);
  }

  // Firebase save call: updates the recipe currently in the database
  // Data described above
  const save = useCallback(async () => {
    const changedRecipe = {
      ...recipe,
      title: recipeName,
      ingredients,
      steps: recipeInfo,
      category,
    };

    try {
      const recipeRes = await firebaseEditRecipe(user.id, changedRecipe);

      // Create the recipe with the id from firebase
      dispatch(editRecipe(changedRecipe));

    } catch (e) {
      console.error(e);
    }
    navigation.navigate('RecipeScreen');
  }, [dispatch, recipe, category, recipeName, ingredients, navigation, recipeInfo, user.id]);

  const delRecipeHandler = () => {
    dispatch(deleteRecipe(recipe.id))
    navigation.navigate('RecipeScreen');
  }

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          {/* Component updating recipeName */}
          <TextInput
            style={styles.recipeName}
            onChangeText={onChangeName}
            value={recipeName}
            mode={'outlined'}
            label={'Recipe Name'}
            inputAccessoryViewID="Done"
          />

          {/* Ingredients section, mapped expanding text inputs */}
          {ingredients.map((ingredient, i) => (
            <View style={styles.ingContainer} key={i}>

              {/* Component updating ingName */}
              <View style={styles.nameInput}>
                <TextInput
                  style={styles.singlelineInput}
                  onChangeText={event => updateIngDataName(i, event)}
                  value={ingredient.ingName}
                  mode={'outlined'}
                  label={'Ingredients'}
                  placeholder="Ingredients"
                  inputAccessoryViewID="Done"
                />
              </View>

              <View style={styles.countInput}>
                {/* Component updating ingCount */}
                <TextInput
                  style={styles.singlelineInput}
                  onChangeText={event => updateIngDataCount(i, event)}
                  value={ingredient.ingCount}
                  mode={'outlined'}
                  label={'#'}
                  placeholder="1/2"
                  inputAccessoryViewID="Done"
                />
              </View>

              <View style={styles.unitInput}>
                {/* Component updating ingUnit */}
                <DropDown
                  label={"Unit"}
                  mode={"outlined"}
                  visible={ingredient.unitDisp}
                  showDropDown={() => updateIngUnitDisp(i, true)}
                  onDismiss={() => updateIngUnitDisp(i, false)}
                  value={ingredient.ingUnit}
                  setValue={(event) => updateIngDataUnit(i, event)}
                  list={MeasurementList}
                />
              </View>
            </View>
          ))}

          {/* Componenet appending a new ingredient object and component to the list */}
          <Button onPress={addIngredients}>
            Add Ingredient
          </Button>

          {/* Component updating recipeInfo (multiline textbox) */}
          <TextInput
            style={styles.multilineInput}
            onChangeText={onChangeRecipe}
            value={recipeInfo}
            multiline={true}
            scrollEnabled={false}
            mode={'outlined'}
            label={'Instructions'}
            placeholder="Instructions"
            inputAccessoryViewID="Done"
          />
        </View>

        {/* Component updating category */}
        <View style={styles.categoryView}>
          <DropDown
            label={"Category"}
            mode={"outlined"}
            value={category}
            visible={categoryDropDownVisibile}
            showDropDown={() => setCategoryDropDownVisibile(true)}
            onDismiss={() => setCategoryDropDownVisibile(false)}
            setValue={(event) => onChangeCategory(event)}
            list={categories}
          />
        </View>

        {/* Component saving recipe, calls dispatch function to append to firebase */}
        <View style={styles.buttonViewStyle}>
          <View style={styles.buttonPaddingStyle}>
            <Button
              style={styles.saveButton}
              onPress={save}
              mode={'contained'}
              icon={'check'}
            >
              Save
            </Button>
          </View>
        </View>
      </View>

      {/* Component displaying the iOS accessory if on iOS else displays nothing */}
      {Accessory && <Accessory />}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  recipeName: {
    fontSize: 36,
  },
  singlelineInput: {
    fontSize: 18,
  },
  multilineInput: {
    fontSize: 18,
  },
  buttonPaddingStyle: {
    flex: 1,
    padding: 10,
  },
  buttonViewStyle: {
    flexDirection: 'row',
    padding: 10,
  },
  saveButton: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  ingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameInput: {
    width: '50%',
  },
  countInput: {
    width: '15%',
  },
  unitInput: {
    width: '33%',
  },
  categoryView: {
    width: '100%',
  }
});

export default RecipeEditScreen;