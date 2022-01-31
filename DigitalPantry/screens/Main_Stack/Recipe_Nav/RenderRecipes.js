import { StyleSheet, Text, View, Button, ScrollView, Animated, Dimensions, ImageBackground, TouchableOpacity, Touchable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import RecipeAddScreen from './RecipeAddScreen';
import React, { Component } from "react"
import { AntDesign } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';

// Function for Displaying Recipes in scroll view

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

  export default RenderScrollView;