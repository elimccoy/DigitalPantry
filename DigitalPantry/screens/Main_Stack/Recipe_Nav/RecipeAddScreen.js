import { InputAccessoryView, StyleSheet, View, Platform } from 'react-native';
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

const Accessory = Platform.select({
  ios: IOSAccessory,
});

const RecipeAddScreen = ({ route, navigation }) => {
  const user = getUser();
  const [ recipeName, onChangeName ] = useState("Recipe Name");
  const [ recipeInfo, onChangeRecipe ] = useState("Lorem ipsum dolor sit amet");
  const [ingredients, addIngredient] = useState([
    { ingName: "", ingCount: "", ingUnit: "", unitDisp: false },
  ]);

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.recipes.categories);

  const save = async () => {
    const newRecipe = {
      title: recipeName,
      ingredients,
      steps: recipeInfo,
      category: categories[0].name, // placeholder to categorize the first recipe with some value
    };

    try {
      const recipe = await saveRecipe(user.id, newRecipe);

      // Create the recipe with the id from firebase
      dispatch(createRecipe({
        id: recipe.id,
        ...newRecipe,
      }));

      navigation.navigate('RecipeScreen');
    } catch (e) {
      console.error(e);
    }
  };

  const measurementList = [
    // volume
    {
      label: "tsp",
      value: "tsp",
    },
    {
      label: "tbsp",
      value: "tbsp",
    },
    {
      label: "fl oz",
      value: "fl oz",
    },
    {
      label: "cup",
      value: "cup",
    },
    {
      label: "pint",
      value: "pint",
    },
    {
      label: "quart",
      value: "quart",
    },
    {
      label: "gallon",
      value: "gallon",
    },
    {
      label: "ml",
      value: "ml",
    },
    {
      label: "liter",
      value: "liter",
    },

    // Mass / Weight
    {
      label: "pound",
      value: "pound",
    },
    {
      label: "ounce",
      value: "oz",
    },
    {
      label: "mg",
      value: "mg",
    },
    {
      label: "kg",
      value: "kg",
    },

    // Length
    {
      label: "mm",
      value: "mm",
    },
    {
      label: "cm",
      value: "cm",
    },
    {
      label: "meter",
      value: "m",
    },
    {
      label: "inch",
      value: "in",
    },

    // Misc
    {
      label: "pack",
      value: "pack",
    },
    {
      label: "bag",
      value: "bag",
    },
    {
      label: "jar",
      value: "jar",
    },
    {
      label: "box",
      value: "box",
    },
    {
      label: "can",
      value: "can",
    },
  ]

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
    addIngredient([...ingredients, { ingName: "", ingCount: "", ingUnit: "", unitDisp: false }]);
  }

    /*
    // Testing only, function for reading ingredient data. Used with Read button.
    var readNum = 0;
    const readOut = () => {
      //console.log(ingData);
      console.log("\nReadNum " + readNum + "\n", ingredients);
      readNum++;
    } 
    */

  return (
    <KeyboardAwareScrollView>

      {/* 
      Currently not supported on recipe screen, removed for now.
      <UploadImage /> 
      */}

      <View style={styles.container}>

        <View style={styles.inputContainer}>
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
                <DropDown
                  label={"Unit"}
                  mode={"outlined"}
                  visible={ingredient.unitDisp}
                  showDropDown={() => updateIngUnitDisp(i, true)}
                  onDismiss={() => updateIngUnitDisp(i, false)}
                  value={ingredient.ingUnit}
                  setValue={event => { updateIngDataUnit(i, event) }}
                  list={measurementList}
                />
              </View>
            </View>
          ))}

          <Button onPress={addIngredients}>
            Add Ingredient
          </Button>

          {/* 
          Button to print ingredient object list to console, testing only.
          <Button onPress={readOut}>
            Read
          </Button> 
          */}

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

      <StatusBar style="dark" translucent={false} backgroundColor='white' />

      {Accessory && <Accessory />}

    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
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