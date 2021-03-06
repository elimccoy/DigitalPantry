import { StyleSheet, View, ImageBackground } from 'react-native';
import { IconButton, Badge } from 'react-native-paper';
import * as React from 'react';

/**
 * SuggestedaItem component that renders the data of a suggested item. Takes in an item and a function that is called when 
 * the user taps on the '+' icon. 
 */
const SuggestedItem = ({ item, addItem }) => { 
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{uri:item.image}}
        resizeMode="cover"
        style={styles.backgroundImgStyle}
        imageStyle={styles.backgroundImgStyleImageStyles}>
        <IconButton
          icon="plus-circle"
          size={23}
          onPress={() => addItem(item)}
          style={styles.addButton}
        />
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
  addButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
});


export default SuggestedItem;