import { StyleSheet, View, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { StatusBar } from 'expo-status-bar';
import PantryItem from '../../../components/PantryItem';


//Data is going to be each pantry item.
const data = [{key: 'Test_Data_1'}, {key: 'Test_Data_2'}, {key: 'Test_Data_3'}, {key: 'Test_Data_4'},
              {key: 'Test_Data_5'}, {key: 'Test_Data_6'}, {key: 'Test_Data_7'}, {key: 'Test_Data_8'}];

const numColumns = 2;

const PantryScreen = ({ route, navigation }) => {

  if(route.params !== undefined)
  {
    let { scannerData } = route.params; 
    data.push({key: scannerData});
  }

  const handlePress = () => {
    navigation.navigate('BarcodeScreen');
  }

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity 
        style={styles.item}
        onLongPress={() => {navigation.navigate('EditScreen')}}>
        <PantryItem item={item}/>
      </TouchableOpacity>
    );
  };

  return(
    <View style={styles.container}>
      <FlatList
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
      <StatusBar style="dark" translucent={false} backgroundColor='white'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight
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