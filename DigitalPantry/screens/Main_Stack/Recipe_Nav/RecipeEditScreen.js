import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { editRecipe, deleteRecipe } from '../../../store/slices/recipes';
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import IOSAccessory from './IOSAccessory';
import UploadImage from './UploadImage';
import { Button, TextInput } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";

const RecipeEditScreen = ({ route, navigation }) => {

  const recipe = useSelector((state) => state.recipes.saved.find((item) => (item.id === route.params.id)));
  const categories = useSelector((state) => state.recipes.categories);
  const dispatch = useDispatch();

  const Accessory = Platform.select({
    ios: IOSAccessory,
  });

  const [recipeName, onChangeName] = useState(recipe.title);
  const [ingList, onChangeIng] = useState(recipe.ingredients || []);
  const [recipeInfo, onChangeRecipe] = useState(recipe.steps || '');
  const [category, onChangeCategory] = useState(recipe.category || '');
  const [showMultiSelectDropDownCategory, setShowMultiSelectDropDownCategory] = useState(false);

  const categoryList = [];
  for (let i = 0; i < categories.length; i++) {
    let newObj = {
      label: categories[i].name,
      value: categories[i].name,
    }
    categoryList.push(newObj);
  }

  const saveRecipe = () => {
    dispatch(editRecipe({
      id: recipe.id,
      title: recipeName,
      ingredients: ingList,
      steps: recipeInfo,
      category,
    }));
    navigation.navigate('RecipeScreen');
  }

  const delRecipeHandler = () => {
    dispatch(deleteRecipe(recipe.id))
    navigation.navigate('RecipeScreen');
  }

  return (
    <KeyboardAwareScrollView>
      <UploadImage />
      < View style={styles.inputContainer}>
        <TextInput
          label="Recipe Name"
          mode={"outlined"}
          onChangeText={onChangeName}
          defaultValue={recipe.title}
          inputAccessoryViewID="Done"
        />
        <TextInput
          label="Ingredients"
          mode={"outlined"}
          onChangeText={onChangeIng}
          defaultValue={recipe.ingredients}
          multiline={true}
          scrollEnabled={false}
          inputAccessoryViewID="Done"
          returnKeyLabel='Done'
        />
        <TextInput
          label="Steps"
          mode={"outlined"}
          onChangeText={onChangeRecipe}
          defaultValue={recipe.steps}
          multiline={true}
          scrollEnabled={false}
          inputAccessoryViewID="Done"
        />
        <DropDown
          label="Category"
          mode={"outlined"}
          visible={showMultiSelectDropDownCategory}
          showDropDown={() => setShowMultiSelectDropDownCategory(true)}
          onDismiss={() => setShowMultiSelectDropDownCategory(false)}
          value={category}
          setValue={(res) => { onChangeCategory(res) }}
          list={categoryList}
          inputAccessoryViewID="Done"
        />
        <View style={styles.flexRow}>
          <View style={styles.buttonContainer}>
            <Button icon="check" mode="contained" onPress={saveRecipe}>
              Save
            </Button>
          </View>
          <View style={styles.buttonContainer}>
            <Button icon="delete" mode="contained" onPress={delRecipeHandler}>
              Delete
            </Button>
          </View>
        </View>

        <StatusBar style="dark" translucent={false} backgroundColor='white' />

        {Accessory && <Accessory />}
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: 'space-evenly',
  },
  buttonContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
  },
  flexRow: {
    flexDirection: 'row',
  },
});

export default RecipeEditScreen;