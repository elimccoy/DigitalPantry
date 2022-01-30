import { StyleSheet, Text, View, ImageBackground } from 'react-native';

const PantryItem = ({item}) => {

  return(
    <View style={styles.container}>
      <ImageBackground source={{uri:item.image}} resizeMode="cover" style={styles.backgroundImgStyle}>
        <Text>Item Name:  {item.name} </Text>
        <Text>UPC: {item.key} </Text>
        <Text>Unit: {item.unit}</Text>
        <Text>Amount: {item.amount}</Text>
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
    backgroundColor: 'grey',
    borderRadius: 10
  },
  backgroundImgStyle: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default PantryItem;