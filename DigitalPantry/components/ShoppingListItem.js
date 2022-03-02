import { StyleSheet, View, ImageBackground } from 'react-native';
import * as React from 'react';
import { Badge } from 'react-native-paper';

/**
 * Component for a shopping list item. It takes an item as a parameter. Conditionally renders the item depending on whether or not the 
 * item is selected (its 'checked' attribute is true). The item looks the same as a pantry ingredient except that when the item is 
 * 'checked' the ImageBackground is darker and a pink dot is displayed on the top left corner of it.
 */

const ShoppingListItem = ({ item }) => {
  return (
    (item.checked) ? // if item is selected
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: item.image }}
          resizeMode="cover"
          style={styles.backgroundImgStyle}
          imageStyle={styles.backgroundImgStyleImageStyles}>
          <Badge style={styles.nameBadge}>{item.name}</Badge>
          <Badge style={styles.statusBadge}>{item.amount + ((item.unit === undefined) ? "" : (" " + item.unit))}</Badge>
          <View style={styles.layer} />
          <Badge style={styles.selectBadge}> </Badge>
        </ImageBackground>

      </View>
      : // if item is not selected
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: item.image }}
          resizeMode="cover"
          style={styles.backgroundImgStyle}
          imageStyle={styles.backgroundImgStyleImageStyles}>
          <Badge style={styles.nameBadge}>{item.name}</Badge>
          <Badge style={styles.statusBadge}>{item.amount + ((item.unit === undefined) ? "" : (" " + item.unit))}</Badge>
        </ImageBackground>

      </View>

  );
};

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
  selectBadge: {
    position: 'absolute',
    top: 7,
    left: 7,
    maxWidth: "70%",
  },
  layer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  }

});

export default ShoppingListItem;