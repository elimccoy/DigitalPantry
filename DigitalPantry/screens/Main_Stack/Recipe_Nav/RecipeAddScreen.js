import { InputAccessoryView, Keyboard, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, TouchableOpacityBase, View, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Avatar, Button, Card, Title, Paragraph, TextInput } from 'react-native-paper';
import UploadImage from './UploadImage';
import IOSAccessory from './IOSAccessory';
import IngredientInfo from './IngredientInfo';
import { ingData } from './IngredientInfo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Accessory = Platform.select({
  ios: IOSAccessory,
});

const RecipeAddScreen = ({ route, navigation }) => {
  const [recipeName, onChangeName] = useState("Recipe Name");
  const [recipeInfo, onChangeRecipe] = useState("Lorem ipsum dolor sit amet");

  const [ingredients, addIngredient] = useState([]);

  function addIngredients() {
    addIngredient([...ingredients, ingData]);
  }

  return (
    <KeyboardAwareScrollView>
      <UploadImage />
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

          { ingredients.map((item, i) => ( <IngredientInfo ingData={item}/> )) }
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
            placeholder="Lorem ipsum dolor sit amet"
            inputAccessoryViewID="Done"
          />
        </View>

        <View style={styles.buttonViewStyle}>
          <View style={styles.buttonPaddingStyle}>

            <Button
              style={styles.saveButton}
              onPress={() => navigation.navigate('RecipeScreen')}
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
});

export default RecipeAddScreen;