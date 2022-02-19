import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React from "react"
import { AntDesign } from '@expo/vector-icons';
import RecipeGrid from './RecipeGrid';
import { useSelector } from 'react-redux';


const MyRecipes = ({ navigation }) => {
  const savedRecipesByCategory = useSelector((state) => state.recipes.categories.map((category) => ({
    title: category.name,
    recipes: state.recipes.saved.filter((recipe) => recipe.category === category.name),
  })));

  const addPressHandler = () => {
    navigation.navigate('RecipeAddScreen');
  };

  return (
    <View style={styles.container}>
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
});

export default MyRecipes;