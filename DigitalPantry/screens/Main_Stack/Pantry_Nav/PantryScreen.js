import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { StatusBar } from 'expo-status-bar';
import PantryItem from '../../../components/PantryItem';


//Data is going to be each pantry item.
const data = [];

const numColumns = 2;

const PantryScreen = ({ route, navigation }) => {

  //#TODO: Work in progress. Used to add product barcode # to list to be shown on screen.
  // Barcode # is passed into the screen under as route.params .
  if(route.params !== undefined)
  {
    let { scannerData } = route.params; 
    data.push({key: scannerData});
  }

  const handlePress = () => {
    navigation.navigate('BarcodeScreen');
  }

 {/* Temp Edit/Add Screen button handler*/}

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.item}>
        <PantryItem item={item}/>
      </View>
    );
  };

  return(
    <View style={styles.container}>
      <Text>Pantry</Text>

      {/* <FlatList
      data={data}
      style={styles.scollContainer}
      renderItem={renderItem}
      numColumns={numColumns}
      />
      <TouchableOpacity 
        style={styles.button}
        onPress={() => {handlePress();}}
      >
        <AntDesign style={styles.icon} name="pluscircleo" size={50} color="black" />
      </TouchableOpacity>
      <StatusBar style="dark" translucent={false} backgroundColor='white'/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  scollContainer:{
    flex: 1
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    height: Dimensions.get('window').width / numColumns, // approximate a square
    width: Dimensions.get('window').width / numColumns - 10
  },
  button: {
    height: 60,
    width: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6200EE',
    borderRadius: 90,
    position: 'absolute',
    right: 20,
    bottom: 15,
    height: 60,
    width: 60
  }
});

export default PantryScreen;