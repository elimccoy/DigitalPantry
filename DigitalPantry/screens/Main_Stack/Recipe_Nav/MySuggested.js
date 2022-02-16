import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import RecipeGrid from './RecipeGrid';

const MySuggested = () => {
  const [recipes, setRecipes] = useState([]);

  // TODO
  /*
    useEffect(() => (
      // Fetch recipes from spoonacular
    ), [SomeSearchQuery])
  */

  return (
    <View style={styles.container}>
      <RecipeGrid rowList={recipes} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MySuggested;