import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import RecipeRow from './RecipeRow';
import RecipeItem from '../../../components/RecipeItem'
import LoadingScreen from '../LoadingScreen';
import { v4 as uuid } from 'uuid';
import * as recAPI from '../../../API/recipes';

const MySuggested = () => {
  
  //Data breakdown:
  //title
  //ingredients
  //steps
  //category

  //Get ingredients from redux.
  const ingredients = useSelector((state) => state.pantry.ingredients);

  //States:
  const [recipes, setRecipes] = useState(ingredients);
  const [isLoaded, setIsLoaded] = useState(true);

  // //didMount.
  // useEffect(() => {

  //   //Determine search params.
  //   let searchParams = {
  //     ingredients: "Apple",
  //   }

  //   //Call API.
  //   recAPI.fetchRecipesByIngredients(searchParams).then((res) => {
  //     console.log(res);
    
  //     //Create objs for each recipe.
  //     let resRecipes = [];
  //     for(let i = 0; i < res.length; i++){
      
  //       let newRecipe = {
  //         id: uuid(),
  //         category: 'Test Category',
  //         title: res[i].title,
  //         posterUrl: res[i].image,
  //       }
  //       resRecipes.push(newRecipe);
  //     }

  //     console.log(resRecipes);

  //     //Save recipes to state.
  //     setRecipes(resRecipes);

  //     //Flag screen load state.
  //     setIsLoaded(true);

  //   });

  // }, []);

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