import { InputAccessoryView, Keyboard, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, TouchableOpacityBase, View, Platform} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Avatar, Button, Card, Title, Paragraph, TextInput } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import UploadImage from './UploadImage';
import IOSAccessory from './IOSAccessory';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { createRecipe } from '../../../store/slices/recipes';
import { saveRecipe } from '../../../API/firebaseMethods';

const Accessory = Platform.select({
  ios: IOSAccessory,
});

const RecipeAddScreen = ({ route, navigation }) => {
  const [ recipeName, onChangeName ] = useState("Recipe Name");
  const [ ingList, onChangeIng ] = useState("1 cup flour");
  const [ recipeInfo, onChangeRecipe ] = useState("Lorem ipsum dolor sit amet");
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.recipes.categories);

  const save = async () => {
    const newRecipe = {
      title: recipeName,
      ingredients: [],
      steps: [],
      category: categories[0].name, // placeholder to categorize the first recipe with some value
    };

    try {
      const recipe = await saveRecipe('kleb', newRecipe);

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

  return (
    <KeyboardAwareScrollView>
      <UploadImage />
      <TextInput
        style={styles.recipeName}
        onChangeText={onChangeName}
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
      <Button onPress={save}>
        Save
      </Button>

      <StatusBar style="dark" translucent={false} backgroundColor='white' />

      { Accessory && <Accessory/> }

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

export default RecipeAddScreen;