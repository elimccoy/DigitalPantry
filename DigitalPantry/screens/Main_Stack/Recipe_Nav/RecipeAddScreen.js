import { InputAccessoryView, Keyboard, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, TouchableOpacityBase, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph, TextInput } from 'react-native-paper';
import UploadImage from './UploadImage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const RecipeAddScreen = ({ route, navigation }) => {

  const { recipeName, onChangeName } = React.useState("Recipe Name");
  const { ingList, onChangeIng } = React.useState("Ingredients");
  const { recipeInfo, onChangeRecipe } = React.useState("Lorem ipsum dolor sit amet");

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
      <Button onPress={() => navigation.navigate('RecipeScreen')}>
        Save
      </Button>

      <StatusBar style="dark" translucent={false} backgroundColor='white' />

      <InputAccessoryView nativeID="Done">
        <View style={styles.accessory}>
          <TouchableOpacity
            onPress={() => Keyboard.dismiss()}
          >
            <Text style={styles.doneButton}>
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </InputAccessoryView>

    </KeyboardAwareScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    flexWrap: 'wrap',
    flexDirection: 'column',
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  recipeName: {
    height: 40,
    //margin: 12,
    //borderWidth: 1,
    padding: 2,
    fontSize: 36,
  },
  defaultInput: {
    height: 36,
    //margin: 12,
    //borderWidth: 1,
    padding: 2,
    fontSize: 18,
  },
  multilineInput: {
    //margin: 12,
    //borderWidth: 1,
    padding: 2,
    fontSize: 18,
  },
  accessory: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 8
  },
  doneButton: {
    color: '#007AFF',
    fontSize: 17
  },

});

export default RecipeAddScreen;