import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React from "react"
import RecipeGrid from './RecipeGrid';

const MySuggested = () => {

  const rows = [{
    title: 'row1',
    recipes: [
      { title: "Suggested Recipe 1", posterUrl: require('../../../assets/recipePlaceholder.png') },
      { title: "Suggested Recipe 2", posterUrl: require('../../../assets/recipePlaceholder.png') },
      { title: "Suggested Recipe 3", posterUrl: require('../../../assets/recipePlaceholder.png') },
      { title: "Suggested Recipe 4", posterUrl: require('../../../assets/recipePlaceholder.png') }
    ]
  },

  {
    title: 'row2',
    recipes: [
      { title: "Suggested Recipe 5", posterUrl: require('../../../assets/recipePlaceholder.png') },
      { title: "Suggested Recipe 6", posterUrl: require('../../../assets/recipePlaceholder.png') },
      { title: "Suggested Recipe 7", posterUrl: require('../../../assets/recipePlaceholder.png') },
      { title: "Suggested Recipe 8", posterUrl: require('../../../assets/recipePlaceholder.png') }
    ]
  },

  {
    title: 'row3',
    recipes: [
      { title: "Suggested Recipe 9", posterUrl: require('../../../assets/recipePlaceholder.png') },
      { title: "Suggested Recipe 10", posterUrl: require('../../../assets/recipePlaceholder.png') },
      { title: "Suggested Recipe 11", posterUrl: require('../../../assets/recipePlaceholder.png') },
      { title: "Suggested Recipe 12", posterUrl: require('../../../assets/recipePlaceholder.png') }
    ]
  },

  {
    title: 'row4',
    recipes: [
      { title: "Suggested Recipe 13", posterUrl: require('../../../assets/recipePlaceholder.png') },
      { title: "Suggested Recipe 14", posterUrl: require('../../../assets/recipePlaceholder.png') },
      { title: "Suggested Recipe 15", posterUrl: require('../../../assets/recipePlaceholder.png') },
      { title: "Suggested Recipe 16", posterUrl: require('../../../assets/recipePlaceholder.png') }
    ]
  }]

  return (
    <View style={styles.container}>

      <RecipeGrid rowList={rows} />

      <StatusBar style="dark" translucent={false} backgroundColor='white' />

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
    width: 60

  }
});

export default MySuggested;