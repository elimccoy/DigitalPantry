import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React from "react"
import { AntDesign } from '@expo/vector-icons';
import RecipeGrid from './RecipeGrid';


function RenderScrollView(props) {

const scrollX = React.useRef(new Animated.Value(0)).current;
const cards = props.cards;

  return (
    <ScrollView
      horizontal={true}
      decelerationRate={"normal"}
      snapToInterval={props.ITEM_WIDTH}
      style={styles.scrollViewRoot}
      showsHorizontalScrollIndicator={false}
      bounces={false}
      disableIntervalMomentum
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false },
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
          <Animated.View key={idx}
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
              style={styles.imageBackgroundContainer}
              imageStyle={styles.imageBackground}
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
  const addPressHandler = () => {
    navigation.navigate('RecipeAddScreen');
  }

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

  const rows = [{
    title: 'row1',
    recipes: [
      { title: "Recipe 1", posterUrl: require('../../../assets/recipePlaceholder.png') },
      { title: "Recipe 2", posterUrl: require('../../../assets/recipePlaceholder.png') },
      { title: "Recipe 3", posterUrl: require('../../../assets/recipePlaceholder.png') },
      { title: "Recipe 4", posterUrl: require('../../../assets/recipePlaceholder.png') },
    ],
  }, {
    title: 'row2',
    recipes: [
      { title: "Recipe 5", posterUrl: require('../../../assets/recipePlaceholder.png') },
      { title: "Recipe 6", posterUrl: require('../../../assets/recipePlaceholder.png') },
      { title: "Recipe 7", posterUrl: require('../../../assets/recipePlaceholder.png') },
      { title: "Recipe 8", posterUrl: require('../../../assets/recipePlaceholder.png') },
    ],
  }, {
    title: 'row3',
    recipes: [
      { title: "Recipe 9", posterUrl: require('../../../assets/recipePlaceholder.png') },
      { title: "Recipe 10", posterUrl: require('../../../assets/recipePlaceholder.png') },
      { title: "Recipe 11", posterUrl: require('../../../assets/recipePlaceholder.png') },
      { title: "Recipe 12", posterUrl: require('../../../assets/recipePlaceholder.png') },
    ],
  }, {
    title: 'row4',
    recipes: [
      { title: "Recipe 13", posterUrl: require('../../../assets/recipePlaceholder.png') },
      { title: "Recipe 14", posterUrl: require('../../../assets/recipePlaceholder.png') },
      { title: "Recipe 15", posterUrl: require('../../../assets/recipePlaceholder.png') },
      { title: "Recipe 16", posterUrl: require('../../../assets/recipePlaceholder.png') },
    ],
  }];

  return (
    <View style={styles.container}>
      <RecipeGrid rowList={rows} />
      {/* This has to stay as the last component to remain on top. */}
      <TouchableOpacity onPress={addPressHandler} style={styles.button}>
        <AntDesign style={styles.icon} name="pluscircle" size={60} color="#6200EE" />
        <View style={styles.floatingButton} />
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
  scrollViewRoot: {
    marginTop: 40,
    paddingHorizontal: 0,
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
    width: 60,
  },
  imageBackgroundContainer: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  imageBackground: {
    borderRadius: 6,
  },
});

export default MyRecipes;