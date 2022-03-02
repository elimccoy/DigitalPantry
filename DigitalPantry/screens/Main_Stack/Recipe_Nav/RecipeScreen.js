import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import RecipeGrid from './RecipeGrid';
import { useSelector } from 'react-redux';

const MyRecipes = ({ navigation }) => {
  // Queries for recipes based on userId and categorizes them returning an array of categories.
  // Each category is an object with the following properties: title, recipes where recipes is an array of recipes
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
      <TouchableOpacity onPress={addPressHandler} style={styles.button}>
        <AntDesign style={styles.icon} name="pluscircle" size={60} color="#6200EE" />
        <View style={styles.floatingButton} />
      </TouchableOpacity>
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
    backgroundColor: 'white',
    borderRadius: 90,
    position: 'absolute',
    right: 20,
    bottom: 15,
    height: 60,
    width: 60,
  },
});

export default MyRecipes;