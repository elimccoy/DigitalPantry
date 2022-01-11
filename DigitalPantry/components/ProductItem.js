import { StyleSheet, Text, View, Image } from 'react-native';

const ProductItem = () => {

  return(
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={require('../assets/apples.jpg')}
          style={styles.image}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text>Product Item Info</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
    height: 220,
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white'
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: '95%',
    width: '95%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10
  },
  infoContainer:{
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ProductItem;