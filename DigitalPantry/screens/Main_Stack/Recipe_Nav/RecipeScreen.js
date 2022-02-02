import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React from "react"
import { AntDesign } from '@expo/vector-icons';
import RecipeGrid from './RecipeGrid';

const MyRecipes = ({ navigation }) => {

  console.debug("Saved and functioning");

  const addPressHandler = () => {
    navigation.navigate('RecipeAddScreen');
  }

  const row1 = [
    { title: "Recipe 1", posterUrl: require('../../../assets/nutmaster.jpeg') },
    { title: "Recipe 2", posterUrl: require('../../../assets/nutmaster.jpeg') },
    { title: "Recipe 3", posterUrl: require('../../../assets/nutmaster.jpeg') },
    { title: "Recipe 4", posterUrl: require('../../../assets/nutmaster.jpeg') }
  ];

  const row2 = [
    { title: "Recipe 5", posterUrl: require('../../../assets/nutmaster.jpeg') },
    { title: "Recipe 6", posterUrl: require('../../../assets/nutmaster.jpeg') },
    { title: "Recipe 7", posterUrl: require('../../../assets/nutmaster.jpeg') },
    { title: "Recipe 8", posterUrl: require('../../../assets/nutmaster.jpeg') }
  ];

  const row3 = [
    { title: "Recipe 9", posterUrl: require('../../../assets/nutmaster.jpeg') },
    { title: "Recipe 10", posterUrl: require('../../../assets/nutmaster.jpeg') },
    { title: "Recipe 11", posterUrl: require('../../../assets/nutmaster.jpeg') },
    { title: "Recipe 12", posterUrl: require('../../../assets/nutmaster.jpeg') }
  ];

  const row4 = [
    { title: "Recipe 13", posterUrl: require('../../../assets/nutmaster.jpeg') },
    { title: "Recipe 14", posterUrl: require('../../../assets/nutmaster.jpeg') },
    { title: "Recipe 15", posterUrl: require('../../../assets/nutmaster.jpeg') },
    { title: "Recipe 16", posterUrl: require('../../../assets/nutmaster.jpeg') }
  ];

  const rows = [
    row1, row2, row3, row4
  ];

  return (
    <View style={styles.container}>

      <RecipeGrid rowList={rows} />

      <StatusBar style="dark" translucent={false} backgroundColor='white' />

      {/* This has to stay as the last component to remain on top. */}
      <TouchableOpacity onPress={addPressHandler} style={styles.button}
      >
        <AntDesign style={styles.icon} name="pluscircle" size={60} color="#6200EE" />
        <View style={styles.floatingButton}></View>
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
    width: 60

  }
});

export default MyRecipes;