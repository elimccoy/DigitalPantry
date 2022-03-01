import { StyleSheet, View } from 'react-native';
import React from "react"
import RecipeGrid from './RecipeGrid';
import { useSelector } from 'react-redux';
import { FAB, Searchbar } from 'react-native-paper';
import { useState} from 'react';

const MyRecipes = ({ navigation }) => {

  // Map category and filter by recipe
  const savedRecipesByCategory = useSelector((state) => state.recipes.categories.map((category) => ({
    title: category.name,
    recipes: state.recipes.saved.filter((recipe) => recipe.category === category.name),
  })));

  // Search query state
  const [searchQuery, setSearchQuery] = useState('');

  // Filter categories by search query
  const filteredSavedRecipesByCategory = savedRecipesByCategory.map((category) => ({
    title: category.title,
    recipes: category.recipes.filter((recipe) => recipe.title.toLowerCase().includes(searchQuery.toLowerCase()))
  }));

  // Recipe add screen navigation
  const addPressHandler = () => {
    navigation.navigate('RecipeAddScreen');
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={(res) => { setSearchQuery(res) }}
        value={searchQuery}
        style={styles.searchBar} />

      <RecipeGrid rowList={filteredSavedRecipesByCategory} />
      {/* This has to stay as the last component to remain on top. */}
      <FAB
        icon="plus"
        style={styles.button}
        onPress={() => addPressHandler()} />
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
  searchBar: {
    margin: 10,
  },
});

export default MyRecipes;