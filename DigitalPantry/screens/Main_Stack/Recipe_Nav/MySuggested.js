import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import RecipeItem from '../../../components/RecipeItem'
import LoadingScreen from '../LoadingScreen';
import { v4 as uuid } from 'uuid';
import * as recAPI from '../../../API/recipes';

const NUMSUGGESTED = 2;

const MySuggested = ({navigation}) => {
  
  /*
    Data breakdown:
    title
    ingredients
    steps
    category
  */

  //States:
  const [recipes, setRecipes] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  //Get ingredients from redux.
  const ingredients = useSelector((state) => state.pantry.ingredients);

  //Force API call on update of ingredients.
  useEffect(() =>{
    //Determine search params by using ingredients.
    let concatList = "";
    ingredients.forEach((ingredient) => {
      concatList += ingredient.name + ",";
    });

    let searchParams = {
      ingredients: concatList,
      number: NUMSUGGESTED,
    }

    //Call API.
    recAPI.fetchRecipesByIngredients(searchParams).then((res) => {
      console.log("API Called");

      //Create objs for each recipe.
      let resRecipes = [];
      for(let i = 0; i < res.length; i++){
        let missingIngredients = "";
        let ownedIngredients = "";

        console.log(res[i].missedIngredients)

        //Make map of measurements and amounts.

        for(let j = 0; j < res[i].missedIngredients.length; j++) {
          missingIngredients += (res[i].missedIngredients[j].name + "\n");
        }

        for(let k = 0; k < res[i].usedIngredients.length; k++) {
          ownedIngredients += (res[i].usedIngredients[k].name + "\n");
        }

        let newRecipe = {
          id: uuid(),
          category: 'Test Category',
          title: res[i].title,
          posterUrl: {uri: res[i].image},
          missingIngredients: missingIngredients,
          ownedIngredients: ownedIngredients,
          steps: res[i].instructions,
          sourceURL: res[i].sourceURL,
          id: res[i].id,
        }
        console.log(newRecipe);
        resRecipes.push(newRecipe);
      }

      //Save recipes to state.
      setRecipes(resRecipes);

      //Flag screen load state.
      setIsLoaded(true);
    });
  }, [ingredients]);

  //Render item for each flat list item.
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onLongPress={() => {navigation.navigate("AddSuggested")}}
        onPress={() => {navigation.navigate("AddSuggested", {item})}}>
        <RecipeItem item={item}/>
      </TouchableOpacity>
    );
  }

  if(isLoaded) {
    return (
      <View style={styles.container}>
        <FlatList
          data={recipes}
          style={styles.scollContainer}
          renderItem={renderItem}
          numColumns={1}
          scrollEnabled={true}
        />
      </View>
    );
  } else {
    return(<LoadingScreen/>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MySuggested;