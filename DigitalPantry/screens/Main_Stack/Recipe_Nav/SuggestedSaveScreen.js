import { StyleSheet, View, ScrollView } from 'react-native';
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Avatar, Button, Title, Paragraph, Subheading } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import LoadingScreen from '../LoadingScreen';
import { useDispatch } from 'react-redux';
import * as recAPI from '../../../API/recipes';
import { createRecipe } from '../../../store/slices/recipes'

const SuggestedSaveScreen = ({ route, navigation }) => {

  //Redux data
  const dispatch = useDispatch(); 

  const[imgURI, setImgURI] =  React.useState(null);
  const[title, setTitle] = React.useState("");
  const[steps, setSteps] = React.useState("");
  const[ownedIngredients, setOwnedIngredients] = React.useState("");
  const[missingIngredients, setMissingIngredients] = React.useState("");
  const[category, setCategory] = React.useState("");
  const[showMultiSelectDropDownCategory, setShowMultiSelectDropDownCategory] = React.useState(false);
  const[isLoaded, setIsLoaded] = React.useState(true);

  const categoryList = [
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

  React.useEffect(() => {
    //Handle incoming data (either new data or edited data.)
    if(route.params !== undefined) {
      setImgURI(route.params.item.posterUrl.uri);
      setTitle(route.params.item.title);
      setOwnedIngredients(route.params.item.ownedIngredients);
      setMissingIngredients(route.params.item.missingIngredients);

      //Read from API steps.


    }
  }, [route.params, navigation]);

  //Handlers for navigating:
  const donePressHandler = () => {

    //Add recipe to redux.
    //let combinedIngredients = missingIngredients + ownedIngredients;
    let recipeToSave = {
      title: title,
      ingredients: "NA",
      steps: "NA",
      category: category,
      posterUrl: { uri: imgURI },
    }

    dispatch(createRecipe(recipeToSave));

    navigation.navigate('SuggestedMain');
  }

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
  expirationDateButton: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  expirationDateText: {
    paddingTop: 10,
    textAlign: 'center',
  },
  avatarStyle: {
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10
  },
  ingredientList: {
    textAlign: 'center',
  },
  SubHeading: {

    fontWeight: 'bold',
  },
  });

export default SuggestedSaveScreen;