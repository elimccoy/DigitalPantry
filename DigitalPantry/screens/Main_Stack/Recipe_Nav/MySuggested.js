import { StyleSheet, Text, View, Button, ScrollView, Animated, Dimensions, ImageBackground, TouchableOpacity, Touchable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import RecipeAddScreen from './RecipeAddScreen';
import React, { Component } from "react"
import { AntDesign } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RenderScrollView from './RenderRecipes';



const MySuggested = ({ route, navigation }) => {

  console.debug("Saved and functioning");

  // recipe add screen navigation
  const addPressHandler = () => {
    navigation.navigate('RecipeAddScreen');
  }


  const OFFSET = 40
  const ITEM_WIDTH = Dimensions.get("window").width - (OFFSET * 2)
  const ITEM_HEIGHT = 200

  const cards1 = [
    { title: "Recipe 1", posterUrl: require('../../../assets/nutmaster.jpeg') },
    { title: "Recipe 2", posterUrl: require('../../../assets/nutmaster.jpeg') },
    { title: "Recipe 3", posterUrl: require('../../../assets/nutmaster.jpeg') },
    { title: "Recipe 4", posterUrl: require('../../../assets/nutmaster.jpeg') },
  ];

  const cards2 = [
    { title: "Recipe 5", posterUrl: require('../../../assets/nutmaster.jpeg') },
    { title: "Recipe 6", posterUrl: require('../../../assets/nutmaster.jpeg') },
    { title: "Recipe 7", posterUrl: require('../../../assets/nutmaster.jpeg') },
    { title: "Recipe 8", posterUrl: require('../../../assets/nutmaster.jpeg') },
  ];

  const cards3 = [
    { title: "Recipe 9", posterUrl: require('../../../assets/nutmaster.jpeg') },
    { title: "Recipe 10", posterUrl: require('../../../assets/nutmaster.jpeg') },
    { title: "Recipe 11", posterUrl: require('../../../assets/nutmaster.jpeg') },
    { title: "Recipe 12", posterUrl: require('../../../assets/nutmaster.jpeg') },
  ];

  const cards4 = [
    { title: "Recipe 13", posterUrl: require('../../../assets/nutmaster.jpeg') },
    { title: "Recipe 14", posterUrl: require('../../../assets/nutmaster.jpeg') },
    { title: "Recipe 15", posterUrl: require('../../../assets/nutmaster.jpeg') },
    { title: "Recipe 16", posterUrl: require('../../../assets/nutmaster.jpeg') },
  ];


  return (
    <View style={styles.container}>



      <ScrollView
        vertical={true}
      >

        <RenderScrollView cards={cards1} ITEM_HEIGHT={ITEM_HEIGHT} ITEM_WIDTH={ITEM_WIDTH} OFFSET={OFFSET} />
        <RenderScrollView cards={cards2} ITEM_HEIGHT={ITEM_HEIGHT} ITEM_WIDTH={ITEM_WIDTH} OFFSET={OFFSET} />
        <RenderScrollView cards={cards3} ITEM_HEIGHT={ITEM_HEIGHT} ITEM_WIDTH={ITEM_WIDTH} OFFSET={OFFSET} />
        <RenderScrollView cards={cards4} ITEM_HEIGHT={ITEM_HEIGHT} ITEM_WIDTH={ITEM_WIDTH} OFFSET={OFFSET} />
      </ScrollView>


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

export default MySuggested;