/**
 * Name: SuggestedSaveScreen.js
 * Desc: React native screen allowing user to read about api generated recipe and save to a category.
 * File type: Screen.
*/

import { StyleSheet, View, ScrollView } from 'react-native';
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Avatar, Button, Title, Paragraph, Subheading } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import LoadingScreen from '../LoadingScreen';
import { useDispatch } from 'react-redux';
import { createRecipe } from '../../../store/slices/recipes';
import * as recAPI from '../../../API/recipes';
import { saveRecipe } from '../../../API/firebaseMethods';
import { getUser } from '../../../UserProvider';

const renderFractionOrInt = (x) => {
  if (x < 1) {
    return `1/${Math.round(1 / parseInt(x, 10))}`
  } else {
    return x.toString();
  }
};

const SuggestedSaveScreen = ({ route, navigation }) => {
  const user = getUser();

  //Redux data
  const dispatch = useDispatch();

  //States:
  const[imgURI, setImgURI] =  React.useState(null);
  const[title, setTitle] = React.useState('');
  const[steps, setSteps] = React.useState('');
  const[ownedIngredients, setOwnedIngredients] = React.useState('');
  const[missingIngredients, setMissingIngredients] = React.useState('');
  const[instructions, setInstructions] = React.useState('');
  const[category, setCategory] = React.useState('Default');
  const[showMultiSelectDropDownCategory, setShowMultiSelectDropDownCategory] = React.useState(false);
  const[isLoaded, setIsLoaded] = React.useState(false);

  const categoryList = [
    {
      label: 'Default',
      value: 'Default',
    },
    {
      label: "Breakfasts",
      value: "Breakfasts",
    },
    {
      label: "Lunches",
      value: "Lunches",
    },
    {
      label: "Soups",
      value: "Soups",
    },
  ];

  //Initial use effect to populate the screen with api data.
  React.useEffect(() => {
    //Handle incoming data (either new data or edited data.)
    if(route.params !== undefined) {
      setImgURI(route.params.item.imageURL);
      setTitle(route.params.item.title);

      //Deal with ingredients.
      let OwnedString = "";
      for(let i = 0; i < route.params.item.ownedIngredients.length; i++) {
        OwnedString += route.params.item.ownedIngredients[i].ingName + " - " +
        renderFractionOrInt(route.params.item.ownedIngredients[i].ingCount) + " " +
        route.params.item.ownedIngredients[i].ingUnit + "\n";
      }
      setOwnedIngredients(OwnedString);

      let MissingString = "";
      for(let i = 0; i < route.params.item.missingIngredients.length; i++) {
        MissingString += route.params.item.missingIngredients[i].ingName + " - " +
        renderFractionOrInt(route.params.item.missingIngredients[i].ingCount) + " " +
        route.params.item.missingIngredients[i].ingUnit + "\n";
      }
      setMissingIngredients(MissingString);
      setInstructions(route.params.item.steps);
    }

    recAPI.fetchRecipeInfo(route.params.item.id).then((res) => {
      setInstructions(res.instructions);
    }).then(() => {
      setIsLoaded(true);
    });
  }, [route.params, navigation]);

  /**
   * Name: donePressHandler
   * Desc: Function to create new recipe item out of user selected category and api data and add to redux.
   */
  const donePressHandler = async () => {

    //Add recipe to redux.
    const recipeToSave = {
      title: title,
      ingredients: [
        ...route.params.item.missingIngredients,
        ...route.params.item.ownedIngredients,
      ],
      steps: instructions,
      category: category || 'Default',
      imageURL: imgURI,
    }

    console.log(recipeToSave);

    try {
      const recipe = await saveRecipe(user.id, recipeToSave);

      // Create the recipe with the id from firebase
      dispatch(createRecipe({
        id: recipe.id,
        ...recipeToSave,
      }));

      navigation.navigate('SuggestedMain');
    } catch (e) {
      console.error(e);
    }
  }

  //Conditionally render depending on loading status of recipe.
  if(isLoaded) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Title>{title}</Title>
        <Avatar.Image size={128} style={styles.avatarStyle} source={{ uri: imgURI }} />
        {/*Container for text inputs*/}
        <View style={styles.inputContainer}>
          <DropDown
            label={"Category"}
            mode={"outlined"}
            visible={showMultiSelectDropDownCategory}
            showDropDown={() => setShowMultiSelectDropDownCategory(true)}
            onDismiss={() => setShowMultiSelectDropDownCategory(false)}
            value={category}
            setValue={(res) => { setCategory(res) }}
            list={categoryList}
          />
          <Subheading style={styles.SubHeading}>Missing Ingredients:</Subheading>
          <Paragraph style={styles.ingredientList}>{missingIngredients}</Paragraph>
          <Subheading style={styles.SubHeading}>Owned Ingredients:</Subheading>
          <Paragraph style={styles.ingredientList}>{ownedIngredients}</Paragraph>
          <Subheading style={styles.SubHeading}>Steps:</Subheading>
          <Paragraph>{instructions}</Paragraph>
        </View>
        <View style={styles.buttonViewStyle}>
          <View style={styles.buttonPaddingStyle}>
            <Button
              icon="check"
              mode="contained"
              onPress={() => donePressHandler()}>
              Add
            </Button>
          </View>
        </View>
      </ScrollView>
    );
  } else {
    return(<LoadingScreen/>);
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    justifyContent: 'center',
    padding: 10,
  },
  buttonPaddingStyle: {
    flex: 1,
    padding: 10,
  },
  buttonViewStyle: {
    flexDirection: 'row',
    padding: 10,
  },
  avatarStyle: {
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  ingredientList: {
    textAlign: 'left',
    padding: 1,
  },
  SubHeading: {
    fontWeight: 'bold',
  },
});

export default SuggestedSaveScreen;