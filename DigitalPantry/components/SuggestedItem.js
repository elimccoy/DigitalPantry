import { Text, StyleSheet, View, TouchableOpacity, ImageBackground } from 'react-native';
import { List, IconButton, Badge } from 'react-native-paper';
import * as React from 'react';



//onPress={() => addItem(item)

const SuggestedItem = ({ item, addItem }) => { //takes in function addItem and also item

  return (
    <View style={styles.container}>

      <ImageBackground
        source={{ uri: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg' }}
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
        <Badge style={styles.statusBadge}>{item.amount + ((item.info === undefined) ? "" : (" " + item.info))}</Badge>
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