import { StyleSheet, View, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { FAB, Searchbar } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import PantryItem from '../../../components/PantryItem';
import LoadingScreen from '../LoadingScreen';
import { useState, useEffect } from 'react';

//Data is going to be each pantry item.
const numColumns = 2;
const data = [{name: 'name1', key: 'Test_Data_1', unit: 'na', amount: 'na', image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg', brand:'na', description:'na', remaining:'Full'},
              {name: 'name2', key: 'Test_Data_2', unit: 'na', amount: 'na', image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg', brand:'na', description:'na', remaining:'Full'},
              {name: 'name3', key: 'Test_Data_3', unit: 'na', amount: 'na', image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg', brand:'na', description:'na', remaining:'Full'},
              {name: 'name4', key: 'Test_Data_4', unit: 'na', amount: 'na', image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg', brand:'na', description:'na', remaining:'Full'},
              {name: 'name5', key: 'Test_Data_5', unit: 'na', amount: 'na', image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg', brand:'na', description:'na', remaining:'Full'},
              {name: 'name6', key: 'Test_Data_6', unit: 'na', amount: 'na', image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg', brand:'na', description:'na', remaining:'Full'},
              {name: 'name7', key: 'Test_Data_7', unit: 'na', amount: 'na', image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg', brand:'na', description:'na', remaining:'Full'},
              {name: 'name8', key: 'Test_Data_8', unit: 'na', amount: 'na', image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg', brand:'na', description:'na', remaining:'Full'},
              {name: 'name9', key: 'Test_Data_9', unit: 'na', amount: 'na', image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg', brand:'na', description:'na', remaining:'Full'},
              {name: 'name10', key: 'Test_Data_10', unit: 'na', amount: 'na', image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg', brand:'na', description:'na', remaining:'Full'},
              {name: 'name11', key: 'Test_Data_11', unit: 'na', amount: 'na', image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg', brand:'na', description:'na', remaining:'Full'},
              {name: 'name12', key: 'Test_Data_12', unit: 'na', amount: 'na', image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg', brand:'na', description:'na', remaining:'Full'},
              {name: 'name13', key: 'Test_Data_13', unit: 'na', amount: 'na', image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg', brand:'na', description:'na', remaining:'Full'}];

const PantryScreen = ({ route, navigation }) => {

  //States.
  const [query, onChangeQuery] = useState(""); //Search Query state
  const [curRenderData, setCurRenderData] = useState(null); //Data items being shown. Adjusted by query.
  const [isLoaded, setIsLoaded] = useState(false);

  //Did mount.
  useEffect(() => {
    setCurRenderData(data);//Load init data.
    setIsLoaded(true);
  }, []);

  //Effect for query
  useEffect(() => {
    handleQueryComplete();
  }, [query]);

  //Handle incoming data (either new data or edited data.)
  if(route.params !== undefined) {
    
    let { item } = route.params; //Get data from route.
    
    //Check to see if data is new or not.
    let isEdit = false;
    for(let i = 0; i < data.length; i++) {
      
      //If we find an existing item, this is an edit.
      if(data[i].key === item.key) {
        //Replace values.
        data[i].name = item.name;
        data[i].unit = item.unit;
        data[i].amount = item.amount;
        data[i].image = item.image;
        data[i].brand = item.brand;
        data[i].desctiption = item.desctiption;
        data[i].remaining = item.remaining;
        isEdit = true;
        break;
      }
    }
    
    //If no edit is found to be true. Add new item.
    if(!isEdit) {
      data.unshift(item);
    }
  }

  //Handle short press of item.
  const handlePress = () => {
    navigation.navigate('BarcodeScreen');
  }

  //Handle long press of item.
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity 
        style={styles.item}
        onLongPress={() => {navigation.navigate('EditScreen', {passedItem:item})}}
        onPress={() => {navigation.navigate("InfoScreen",{passedItem:item})}}
      >
        <PantryItem item={item}/>
      </TouchableOpacity>
    );
  };

  //Handle Query complete search.
  const handleQueryComplete = () => {
    
    if(query === "")
    {
      setCurRenderData(data);
      return;
    }

    //Find items that match query.
    let toSetData = [];
    console.log(query)
    for(let i = 0; i < data.length; i++)
    {
      if(data[i].name.includes(query))
      {
        toSetData.push(data[i]);
      }
    }
    console.log(toSetData)
    setCurRenderData(toSetData);
  }

  if(isLoaded)
  {
    return(
      <View style={styles.container}>
        <View>
        <Searchbar
          placeholder="Search"
          onChangeText={(res) => { onChangeQuery(res) }}
          value={query}
          style={styles.searchBar}/>
        </View>
        <FlatList
          data={curRenderData}
          style={styles.scollContainer}
          renderItem={renderItem}
          numColumns={numColumns}
        />
        <FAB
          icon="plus"
          style={styles.button}
          onPress={() => handlePress()}/>
        <StatusBar style="dark" translucent={false} backgroundColor='white'/>
      </View>
    );
  }
  else
  {
    return(<LoadingScreen/>);
  }
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
    borderRadius: 90,
    position: 'absolute',
    right: 20,
    bottom: 15,
    height: 60,
    width: 60
  },
  searchBar: {
    margin: 10
  }
});

export default PantryScreen;