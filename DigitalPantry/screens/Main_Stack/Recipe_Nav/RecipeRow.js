import { StyleSheet, Text, ScrollView, Animated, ImageBackground, Dimensions, Pressable } from 'react-native';
import { useRef } from "react"
import { useNavigation } from '@react-navigation/native';

// Taken from : https://chanonroy.medium.com/building-a-netflix-style-card-carousel-in-react-native-649afcd8d78e
function RecipeRow({ recipes }) {

  // Declare dimensions of recipe cards
  const scrollX = useRef(new Animated.Value(0)).current;
  const OFFSET = 40
  const ITEM_WIDTH = Dimensions.get("window").width - (OFFSET * 2)
  const ITEM_HEIGHT = 200

  // Declare navigation
  const navigation = useNavigation();

  // Component for pressable recipe cards
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

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

        const editPressHandler = () => {
          navigation.navigate('RecipeEditScreen', { id: item.id });
        }

        const infoPressHandler = () => {
          navigation.navigate('RecipeInfoScreen', { id: item.id });
        }

        return (
          <AnimatedPressable
            onPress={infoPressHandler}
            onLongPress={editPressHandler}
            key={item.id}
          >
            <Animated.View
              style={{
                width: ITEM_WIDTH,
                height: ITEM_HEIGHT,
                marginLeft: idx === 0 ? OFFSET : undefined,
                opacity: opacity,
                transform: [{ scale: translate }],
              }}
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
          </AnimatedPressable>
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