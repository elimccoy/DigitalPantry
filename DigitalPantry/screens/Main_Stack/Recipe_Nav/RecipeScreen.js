import { StyleSheet, Text, View, Button, ScrollView, Animated, Dimensions, ImageBackground, TouchableOpacity, Touchable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import RecipeAddScreen from './RecipeAddScreen';
import React, { Component } from "react"

const addPressHandler = () => {
  navigation.navigate('RecipeAddScreen');
}

function RenderScrollView(props) {

const scrollX = React.useRef(new Animated.Value(0)).current;
const cards = props.cards;

  return (
    <ScrollView
      horizontal={true}
      decelerationRate={"normal"}
      snapToInterval={props.ITEM_WIDTH}
      style={{ marginTop: 40, paddingHorizontal: 0 }}
      showsHorizontalScrollIndicator={false}
      bounces={false}
      disableIntervalMomentum
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
      )}
      scrollEventThrottle={12}
    >
      {cards.map((item, idx) => {
        const inputRange = [
          (idx - 1) * props.ITEM_WIDTH,
          idx * props.ITEM_WIDTH,
          (idx + 1) * props.ITEM_WIDTH,
        ]

        const translate = scrollX.interpolate({
          inputRange,
          outputRange: [0.85, 1, 0.85],
        })

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.5, 1, 0.5],
        })

        return (
          <Animated.View
            style={{
              width: props.ITEM_WIDTH,
              height: props.ITEM_HEIGHT,
              marginLeft: idx === 0 ? props.OFFSET : undefined,
              marginRight: idx === cards.length - 1 ? props.OFFSET : undefined,
              opacity: opacity,
              transform: [{ scale: translate }],
            }}
          >
            <ImageBackground
              source={item.posterUrl}
              style={{
                flex: 1,
                resizeMode: "cover",
                justifyContent: "center",
              }}
              imageStyle={{ borderRadius: 6 }}
            />
            <Text>
              Recipe: {item.title}
            </Text>
          </Animated.View>
        )
      })}
    </ScrollView>
  );

}

const RecipeScreen = ({ route, navigation }) => {

  console.debug("Saved and functioning");

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


  return (
    <View style={styles.container}>

      <ScrollView
        vertical={true}
      >

      <RenderScrollView cards={cards1} ITEM_HEIGHT={ITEM_HEIGHT} ITEM_WIDTH={ITEM_WIDTH} OFFSET={OFFSET}/>
      <RenderScrollView cards={cards2} ITEM_HEIGHT={ITEM_HEIGHT} ITEM_WIDTH={ITEM_WIDTH} OFFSET={OFFSET}/>

      </ScrollView>

      <StatusBar style="dark" translucent={false} backgroundColor='white' />

      {/* This has to stay as the last component to remain on top. */}
      <TouchableOpacity onPress={addPressHandler} style={{ position: 'absolute', bottom: 20, right: 20 }}>
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
  floatingButton: {
    backgroundColor: 'blue',
    width: 60,
    height: 60,
    borderRadius: 60
  }
});

export default RecipeScreen;