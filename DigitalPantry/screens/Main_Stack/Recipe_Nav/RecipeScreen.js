import { StyleSheet, Text, View, Button, ScrollView, Animated, Dimensions, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import RecipeAddScreen from './RecipeAddScreen';
import React, { Component } from "react"



const RecipeScreen = ({ route, navigation }) => {

  console.debug("Saved and functioning");

  const OFFSET = 40
  const ITEM_WIDTH = Dimensions.get("window").width - (OFFSET * 2)
  const ITEM_HEIGHT = 200

  const cards = [
    { title: "Movie 1", posterUrl: require('../../../assets/nutmaster.jpeg') },
    { title: "Movie 2", posterUrl: require('../../../assets/nutmaster.jpeg') },
    { title: "Movie 3", posterUrl: require('../../../assets/nutmaster.jpeg') },
    { title: "Movie 4", posterUrl: require('../../../assets/nutmaster.jpeg') },
  ];

  const cards2 = [
    { title: "Movie 1", posterUrl: require('../../../assets/nutmaster.jpeg') },
    { title: "Movie 2", posterUrl: require('../../../assets/nutmaster.jpeg') },
    { title: "Movie 3", posterUrl: require('../../../assets/nutmaster.jpeg') },
    { title: "Movie 4", posterUrl: require('../../../assets/nutmaster.jpeg') },
  ];




  const scrollX = React.useRef(new Animated.Value(0)).current;

  const addPressHandler = () => {
    navigation.navigate('RecipeAddScreen');
  }

  return (
    <View style={styles.container}>
      <Text>Welcome to the Recipe Screen!</Text>

      <Button title="Navigate to Add Screen" onPress={addPressHandler} />

      <ScrollView
        vertical={true}
      >


        <ScrollView
          horizontal={true}
          decelerationRate={"normal"}
          snapToInterval={ITEM_WIDTH}
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
              (idx - 1) * ITEM_WIDTH,
              idx * ITEM_WIDTH,
              (idx + 1) * ITEM_WIDTH,
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
                  width: ITEM_WIDTH,
                  height: ITEM_HEIGHT,
                  marginLeft: idx === 0 ? OFFSET : undefined,
                  marginRight: idx === cards.length - 1 ? OFFSET : undefined,
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
              </Animated.View>
            )
          })}
        </ScrollView>


        <ScrollView
          horizontal={true}
          decelerationRate={"normal"}
          snapToInterval={ITEM_WIDTH}
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
              (idx - 1) * ITEM_WIDTH,
              idx * ITEM_WIDTH,
              (idx + 1) * ITEM_WIDTH,
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
                  width: ITEM_WIDTH,
                  height: ITEM_HEIGHT,
                  marginLeft: idx === 0 ? OFFSET : undefined,
                  marginRight: idx === cards.length - 1 ? OFFSET : undefined,
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
              </Animated.View>
            )
          })}
        </ScrollView>


        <ScrollView
          horizontal={true}
          decelerationRate={"normal"}
          snapToInterval={ITEM_WIDTH}
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
              (idx - 1) * ITEM_WIDTH,
              idx * ITEM_WIDTH,
              (idx + 1) * ITEM_WIDTH,
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
                  width: ITEM_WIDTH,
                  height: ITEM_HEIGHT,
                  marginLeft: idx === 0 ? OFFSET : undefined,
                  marginRight: idx === cards.length - 1 ? OFFSET : undefined,
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
              </Animated.View>
            )
          })}
        </ScrollView>

        <ScrollView
          horizontal={true}
          decelerationRate={"normal"}
          snapToInterval={ITEM_WIDTH}
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
              (idx - 1) * ITEM_WIDTH,
              idx * ITEM_WIDTH,
              (idx + 1) * ITEM_WIDTH,
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
                  width: ITEM_WIDTH,
                  height: ITEM_HEIGHT,
                  marginLeft: idx === 0 ? OFFSET : undefined,
                  marginRight: idx === cards.length - 1 ? OFFSET : undefined,
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
              </Animated.View>
            )
          })}
        </ScrollView>




      </ScrollView>

      <StatusBar style="dark" translucent={false} backgroundColor='white' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default RecipeScreen;