import { StyleSheet, View, Text, ImageBackground } from 'react-native';

const PantryItem = ({item}) => {

  return(
    <View style={styles.container}>
      <ImageBackground 
        source={{uri:item.image}} 
        resizeMode="cover" 
        style={styles.backgroundImgStyle}
        imageStyle={{ borderRadius: 10}}>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>{item.amount}</Text>
        </View>
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
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#6200EE'
  },
  backgroundImgStyle: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    borderRadius: 10,
  },
  statusContainer: {
    position: 'absolute',
    bottom: 7,
    left: 7,
    backgroundColor: '#6200EE',
    width: 40,
    height: 40,
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    fontWeight: '700',
    fontSize: 15
  }
});

export default PantryItem;