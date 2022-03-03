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

const Accessory = Platform.select({
  ios: IOSAccessory,
});

const RecipeAddScreen = ({ navigation }) => {
  const user = getUser();
  const dispatch = useDispatch();

  const [ recipeName, onChangeName ] = useState('');
  const [ recipeInfo, onChangeRecipe ] = useState('');
  const [ingredients, addIngredient] = useState([
    { ingName: '', ingCount: '', ingUnit: '', unitDisp: false },
  ]);

  const categories = useSelector((state) => state.recipes.categories);

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

  return (
    <KeyboardAwareScrollView>
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
                  list={MeasurementList}
                />
              </View>
            </View>
          ))}

          <Button onPress={addIngredients}>
            Add Ingredient
          </Button>

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