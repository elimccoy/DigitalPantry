import { StyleSheet, Text, ScrollView, Animated, ImageBackground, Dimensions } from 'react-native';
import { useRef } from "react"

// Taken from : https://chanonroy.medium.com/building-a-netflix-style-card-carousel-in-react-native-649afcd8d78e
function RecipeRow({ recipes }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const OFFSET = 40
  const ITEM_WIDTH = Dimensions.get("window").width - (OFFSET * 2)
  const ITEM_HEIGHT = 200

  return (
    <ScrollView
      horizontal={true}
      decelerationRate={"normal"}
      snapToInterval={ITEM_WIDTH}
      style={styles.root}
      showsHorizontalScrollIndicator={false}
      bounces={false}
      disableIntervalMomentum
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false },
      )}
      scrollEventThrottle={12}
    >
      {recipes.map((item, idx) => {
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
              opacity: opacity,
              transform: [{ scale: translate }],
            }}
            key={item.id}
          >
            <ImageBackground
              source={item.imageURL}
              style={styles.backgroundImageContainer}
              imageStyle={styles.backgroundImage}
            />
            <Text>
              {item.title}
            </Text>
          </Animated.View>
        )
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    marginTop: 40, paddingHorizontal: 0,
  },
  backgroundImageContainer: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  backgroundImage: {
    borderRadius: 6,
  },
});

export default RecipeRow;