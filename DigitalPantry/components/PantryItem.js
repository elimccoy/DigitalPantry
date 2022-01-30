import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { Badge } from 'react-native-paper';

const PantryItem = ({item}) => {

  return(
    <View style={styles.container}>
      <ImageBackground 
        source={{uri:item.image}} 
        resizeMode="cover" 
        style={styles.backgroundImgStyle}
        imageStyle={{ borderRadius: 10}}>
        <Badge style={styles.statusContainer}>{item.amount}</Badge>
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
    borderWidth: 1,
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
    left: 7
  },
  statusText: {
    fontWeight: '700',
    fontSize: 15
  }
});

export default PantryItem;