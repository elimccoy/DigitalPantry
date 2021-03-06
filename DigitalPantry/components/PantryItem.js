/**
 * Name: PantryItem.js
 * Desc: React native component that displays a pantry image, name, and amount in a square card.
 * File type: Component.
*/

import { StyleSheet, View, ImageBackground } from 'react-native';
import { Badge } from 'react-native-paper';

const PantryItem = ({item}) => {

  return(
    <View style={styles.container}>
      <ImageBackground
        source={{uri:item.image}}
        resizeMode="cover"
        style={styles.backgroundImgStyle}
        imageStyle={styles.backgroundImgStyleImageStyles}>
        <Badge style={styles.nameBadge}>{item.name}</Badge>
        <Badge style={styles.statusBadge}>{item.amount}</Badge>
      </ImageBackground>
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
  backgroundImgStyle: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  backgroundImgStyleImageStyles: {
    borderRadius: 3,
  },
  statusBadge: {
    position: 'absolute',
    bottom: 7,
    left: 7,
    maxWidth: "70%",
  },
  nameBadge: {
    position: 'absolute',
    top: 7,
    right: 7,
    maxWidth: "70%",
  },
});

export default PantryItem;