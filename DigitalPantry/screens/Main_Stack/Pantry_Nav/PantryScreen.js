import { StyleSheet, View, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { FAB, Searchbar } from 'react-native-paper';
import PantryItem from '../../../components/PantryItem';
import LoadingScreen from '../LoadingScreen';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';

//Data is going to be each pantry item.
const numColumns = 2;
//const data = [];

const PantryScreen = ({ navigation }) => {

  //Redux data
  const data = useSelector((state) => state.pantry.ingredients);
  //const dispatch = useDispatch();

  //States.
  const [query, onChangeQuery] = useState(""); //Search Query state
  const [curRenderData, setCurRenderData] = useState(null); //Data items being shown. Adjusted by query.
  const [isLoaded, setIsLoaded] = useState(false);

  //Did mount.
  useEffect(() => {
    setCurRenderData(data);//Load init data.
    setIsLoaded(true);
  }, [data]);

  //Handle Query complete search.
  const handleQueryComplete = useCallback(() => {
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
  }, [query]);

  //Effect for query
  useEffect(() => {
    handleQueryComplete();
  }, [handleQueryComplete]);

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
        onPress={() => {navigation.navigate("InfoScreen",{key:item.key})}}
      >
        <PantryItem item={item}/>
      </TouchableOpacity>
    );
  };

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
  },
  scollContainer:{
    flex: 1,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    height: Dimensions.get('window').width / numColumns, // approximate a square
    width: Dimensions.get('window').width / numColumns - 10,
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
    width: 60,
  },
  searchBar: {
    margin: 10,
  },
});

export default PantryScreen;