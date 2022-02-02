import {Text, ScrollView, Animated, ImageBackground, Dimensions } from 'react-native';
import React from "react"

// Taken from : https://chanonroy.medium.com/building-a-netflix-style-card-carousel-in-react-native-649afcd8d78e
function RecipeRow(props) {

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const cards = props.recipes;
  const OFFSET = 40
  const ITEM_WIDTH = Dimensions.get("window").width - (OFFSET * 2)
  const ITEM_HEIGHT = 200

  return (
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
      {props.recipes.map((item, idx) => {
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
            key={item.title}
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

export default RecipeRow;