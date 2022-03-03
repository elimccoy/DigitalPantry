/**
 * Name: RecipeItem.js
 * Desc: React native component that displays a recipe image and name in a rectangle card.
 * File type: Component.
*/

import { StyleSheet, View, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { Paragraph } from 'react-native-paper';

const RecipeItem = ({item}) => {

  return(
    <View style={styles.item}>
      <View style={styles.container}>
        <ImageBackground
          source={item.posterUrl}
          resizeMode="cover"
          style={styles.backgroundImgStyle}
          imageStyle={styles.backgroundImgStyleImageStyles}/>
      </View>
      <Paragraph>{item.title}</Paragraph>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    elevation: 3,
    shadowColor: '#52006A',
  },
  item: {
    justifyContent: 'center',
    margin: 5,
    height: Dimensions.get('window').height / 3, // approximate a square
    width: "97.5%",
  },
  backgroundImgStyle: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  backgroundImgStyleImageStyles: {
    borderRadius: 3,
  },
});

export default RecipeItem;