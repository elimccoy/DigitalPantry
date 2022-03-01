import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import * as React from 'react';
import { List, Checkbox, Badge} from 'react-native-paper';


const ShoppingListItem = ({item}) => {
  const [checked, setChecked] = React.useState(false);

  return (
    <View style={styles.container}>
    <ImageBackground
      source={{ uri: item.image}}
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
  checkBadge: {
    position: 'absolute',
    top: 7,
    left: 7,
    color: "purple",
  },
});

export default ShoppingListItem;