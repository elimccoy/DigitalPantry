import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, TextInput } from 'react-native';
import { editRecipe } from '../../../store/slices/recipes';
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import IOSAccessory from './IOSAccessory';
import UploadImage from './UploadImage';

const RecipeEditScreen = ({ route, navigation }) => {

  const recipe = useSelector((state) => state.recipes.saved.find((item) => (item.id === route.params.id)));
  const dispatch = useDispatch();

  const Accessory = Platform.select({
    ios: IOSAccessory,
  });

  const { recipeName, onChangeName } = useState(state.recipes.title);
  const { ingList, onChangeIng } = useState(state.recipes.ingredients);
  const { recipeInfo, onChangeRecipe } = useState(state.recipes.steps);
  const categories = useSelector((state) => state.recipes.categories);

  const saveRecipe = () => {
    dispatch(editRecipe({
      id: recipe.id,
      title: recipeName,
      ingredients: ingList,
      steps: recipeInfo,
      category: categories[0].name, // placeholder to categorize the first recipe with some value
    }));

    navigation.navigate('RecipeScreen');
  }

  const deleteRecipe = () => {
    dispatch(deleteRecipe(recipe.id))
    navigation.navigate('RecipeScreen');
  }

  return (
    <KeyboardAwareScrollView>
      <UploadImage />
      <TextInput
        style={styles.recipeName}
        onEndEditing={onChangeName}
        value={recipeName}
        placeholder="Recipe Name"
        inputAccessoryViewID="Done"
      />
      <TextInput
        style={styles.multilineInput}
        onChangeText={onChangeIng}
        value={ingList}
        multiline={true}
        scrollEnabled={false}
        placeholder="Ingredients"
        inputAccessoryViewID="Done"
      />
      <TextInput
        style={styles.multilineInput}
        onChangeText={onChangeRecipe}
        value={recipeInfo}
        multiline={true}
        scrollEnabled={false}
        placeholder="Lorem ipsum dolor sit amet"
        inputAccessoryViewID="Done"
      />
      <Button title="Save" onPress={saveRecipe} />

      <Button title="Delete" onPress={deleteRecipe} />

      <StatusBar style="dark" translucent={false} backgroundColor='white' />

      {Accessory && <Accessory />}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  recipeName: {
    height: 40,
    //margin: 12,
    //borderWidth: 1,
    padding: 2,
    fontSize: 36,
  },
  multilineInput: {
    //margin: 12,
    //borderWidth: 1,
    padding: 2,
    fontSize: 18,
  },
});

export default RecipeEditScreen;