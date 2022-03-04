import { StyleSheet, Text, View, ScrollView, Animated, ImageBackground, Dimensions, Pressable } from 'react-native';
import { Headline } from 'react-native-paper';
import { useRef } from "react"
import { useNavigation } from '@react-navigation/native';

import placeholderImage from '../../../assets/recipePlaceholder.png';

// Taken from : https://chanonroy.medium.com/building-a-netflix-style-card-carousel-in-react-native-649afcd8d78e
function RecipeRow({ title, recipes }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const OFFSET = 40
  const ITEM_WIDTH = Dimensions.get("window").width - (OFFSET * 2)
  const ITEM_HEIGHT = 200
  const navigation = useNavigation();
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  console.log(recipes);

  return (
    <View style={styles.root}>
      <Headline>{title}</Headline>
      <ScrollView
        horizontal={true}
        decelerationRate={"normal"}
        snapToInterval={ITEM_WIDTH}
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
                  // marginLeft: idx === 0 ? OFFSET : undefined,
                  opacity: opacity,
                  transform: [{ scale: translate }],
                }}
              >
                <ImageBackground
                  source={item.imageURL ? { uri: item.imageURL } : placeholderImage }
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
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    margin: 20,
    paddingHorizontal: 0,
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