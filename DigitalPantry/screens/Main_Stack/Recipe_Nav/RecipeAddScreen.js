
/**
 * Name: RecipeAddScreen.js
 * Desc: React native screen that allows the user to add a custom recipe to the saved recipes page.
 * File type: Screen
*/

import { StyleSheet, View, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
//import UploadImage from './UploadImage';
import IOSAccessory from './IOSAccessory';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector, useDispatch } from 'react-redux';
import { createRecipe } from '../../../store/slices/recipes';
import DropDown from "react-native-paper-dropdown";
import { saveRecipe } from '../../../API/firebaseMethods';
import { getUser } from '../../../UserProvider';
import { MeasurementList } from './util';

// Platform selection: checks for ios or android platform, used in Accessory component.
const Accessory = Platform.select({
  ios: IOSAccessory,
});

// Main screen function
const RecipeAddScreen = ({ navigation }) => {

  // Gets user information and data, establishes dispatch for firebase data.
  const user = getUser();
  const dispatch = useDispatch();

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
  */
  const [ recipeName, onChangeName ] = useState('');
  const [ recipeInfo, onChangeRecipe ] = useState('');
  const [ingredients, addIngredient] = useState([
    { ingName: '', ingCount: '', ingUnit: '', unitDisp: false },
  ]);

  // Category selector: assigns category on saved recipe screen
  const categories = useSelector((state) => state.recipes.categories);

  // Firebase save call: creates the new recipe and populates it with information provided by the user
  // Data described above
  const save = async () => {
    const newRecipe = {
      title: recipeName,
      ingredients,
      steps: recipeInfo,
      category: categories && categories.length && categories[0].name || 'Default', // placeholder to categorize the first recipe with some value
    };

    console.log(38, newRecipe);

    try {
      const recipe = await saveRecipe(user.id, newRecipe);

      // Create the recipe with the id from firebase
      dispatch(createRecipe({
        id: recipe.id,
        ...newRecipe,
      }));

    } catch (e) {
      console.error(e);
    }
    navigation.navigate('RecipeScreen');
  };

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

  // Creates a new default ingredient object and appends it to the mapped list.
  const addIngredients = () => {
    addIngredient([...ingredients, { ingName: "", ingCount: "", ingUnit: "", unitDisp: false }]);
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

              {/* Component updating ingCount */}
              <View style={styles.countInput}>
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

              {/* Component updating ingUnit */}
              <View style={styles.unitInput}>
                <DropDown
                  label={"Unit"}
                  mode={"outlined"}
                  visible={ingredient.unitDisp}
                  showDropDown={() => updateIngUnitDisp(i, true)}
                  onDismiss={() => updateIngUnitDisp(i, false)}
                  value={ingredient.ingUnit}
                  setValue={event => { updateIngDataUnit(i, event) }}
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
});

export default RecipeAddScreen;