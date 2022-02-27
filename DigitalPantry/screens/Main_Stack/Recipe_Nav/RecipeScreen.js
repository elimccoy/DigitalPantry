import { StyleSheet, View} from 'react-native';
import React from "react"
import RecipeGrid from './RecipeGrid';
import { useSelector } from 'react-redux';
import { FAB, Searchbar } from 'react-native-paper';
import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from "@react-navigation/core";

const MyRecipes = ({ navigation }) => {
  const savedRecipesByCategory = useSelector((state) => state.recipes.categories.map((category) => ({
    title: category.name,
    recipes: state.recipes.saved.filter((recipe) => recipe.category === category.name),
  })));

//   // begin search code
//   const [curRenderData, setCurRenderData] = useState(savedRecipesByCategory);
//   const [query, onChangeQuery] = useState(""); //Search Query state

//    useFocusEffect(
//     useCallback(() => {
//       setCurRenderData(savedRecipesByCategory);
//     }, [savedRecipesByCategory]),
//   );

// //Handle Query complete search.
// const handleQueryComplete = useCallback(() => {
//   if(query === "")
//   {
//     setCurRenderData(savedRecipesByCategory);
//     return;
//   }

//   //Find items that match query.
//   let toSetData = [];
//   console.log(savedRecipesByCategory)
//   for(let i = 0; i < savedRecipesByCategory.length; i++)
//   {
//     if(savedRecipesByCategory[i].title.includes(query))
//     {
//       toSetData.push(savedRecipesByCategory[i]);
//     }
//   }
//   console.log(toSetData)
//   setCurRenderData(toSetData);
// }, [query, savedRecipesByCategory]);

// //Effect for query
// useEffect(() => {
//   handleQueryComplete();
// }, [handleQueryComplete]);

// // end search code



  const addPressHandler = () => {
    navigation.navigate('RecipeAddScreen');
  };

  return (
    <View style={styles.container}>
      {/*}
      <Searchbar
          placeholder="Search"
          onChangeText={(res) => { onChangeQuery(res) }}
          value={query}
          style={styles.searchBar} />
  */}
      <RecipeGrid rowList={savedRecipesByCategory} />
      {/* This has to stay as the last component to remain on top. */}
      <FAB
          icon="plus"
          style={styles.button}
          onPress={() => addPressHandler()}/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 60,
    width: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 90,
    position: 'absolute',
    right: 20,
    bottom: 15,
    height: 60,
    width: 60,
  },
  // searchBar: {
  //   margin: 10,
  // },
});

export default MyRecipes;