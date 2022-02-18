import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import LoadingScreen from '../LoadingScreen';

const RecipeEditScreen = ({ route, navigation }) => {

  const recipe = useSelector((state) => state.recipes.saved.find((item) => (item.id === route.params.id)));



  const { recipeName, onChangeName } = useState("Recipe Name");
  const { ingList, onChangeIng } = useState("Ingredients");
  const { recipeInfo, onChangeRecipe } = useState("Steps...... ");




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
        placeholder="Steps...."
        inputAccessoryViewID="Done"
      />
      <Button onPress={() => navigation.navigate('RecipeScreen')}>
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

export default PantryItemEditScreen;