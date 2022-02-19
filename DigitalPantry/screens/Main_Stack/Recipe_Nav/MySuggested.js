import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import RecipeItem from '../../../components/RecipeItem'
import LoadingScreen from '../LoadingScreen';
import { v4 as uuid } from 'uuid';
import * as recAPI from '../../../API/recipes';

const NUMSUGGESTED = 20;

const MySuggested = () => {
  
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
        let newRecipe = {
          id: uuid(),
          category: 'Test Category',
          title: res[i].title,
          posterUrl: res[i].image,
        }
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
      <RecipeItem item={item}/>
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