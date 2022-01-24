import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { StatusBar } from 'expo-status-bar';
import PantryItem from '../../../components/PantryItem';


//Data is going to be each pantry item.
const data = [{key: 'Test_Data_1', unit: 'na', amount: 'na'}, {key: 'Test_Data_2', unit: 'na', amount: 'na'}, {key: 'Test_Data_3', unit: 'na', amount: 'na'}, {key: 'Test_Data_4', unit: 'na', amount: 'na'},
              {key: 'Test_Data_5', unit: 'na', amount: 'na'}, {key: 'Test_Data_6', unit: 'na', amount: 'na'}, {key: 'Test_Data_7', unit: 'na', amount: 'na'}, {key: 'Test_Data_8', unit: 'na', amount: 'na'}];

const numColumns = 2;

const PantryScreen = ({ route, navigation }) => {

  //Handle incoming data (either new data or edited data.)
  if(route.params !== undefined) {
    
    let { item } = route.params; //Get data from route.
    
    //Check to see if data is new or not.
    let isEdit = false;
    for(let i = 0; i < data.length; i++) {
      
      //If we find an existing item, this is an edit.
      if(data[i].key === item.key) {
        //Replace values.
        data[i].unit = item.unit;
        data[i].amount = item.amount;
        isEdit = true;
        break;
      }
    }
    
    //If no edit is found to be true. Add new item.
    if(!isEdit) {
      data.push(item);
    }
  }

  const handlePress = () => {
    navigation.navigate('BarcodeScreen');
  }

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity 
        style={styles.item}
        onLongPress={() => {navigation.navigate('EditScreen', {passedItem:item})}}
        onPress={() => {alert('Test on press (quick)')}}
      >
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