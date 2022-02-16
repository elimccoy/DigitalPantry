import { StyleSheet, View, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { FAB, Searchbar } from 'react-native-paper';
import PantryItem from '../../../components/PantryItem';
import LoadingScreen from '../LoadingScreen';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';
import PantryCategoryBlock from '../../../components/PantryCategoryBlock'

//Data is going to be each pantry item.
const numColumns = 2;
const categories = [{catName:"Test Category 1", key:1}, {catName:"Test Category 2", key:2}, {catName:"Test Category 3", key:3}];
//const data = [];

const PantryScreen = ({ navigation }) => {

  //Redux data
  const data = useSelector((state) => state.pantry.ingredients);
  const [curRenderData, setCurRenderData] = useState(data);

  //States.
  const [query, onChangeQuery] = useState(""); //Search Query state

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

  //Handle add item.
  const handlePress = () => {
    navigation.navigate('BarcodeScreen');
  }

  const renderItem = ({item, index}) => {
    return (
      <PantryCategoryBlock
        navigation={navigation}
        category={item.catName}
        data={curRenderData}
      />
    );
  }

  return(
    <View style={styles.container}>
      <View>
        <Searchbar
          placeholder="Search"
          onChangeText={(res) => { onChangeQuery(res) }}
          value={query}
          style={styles.searchBar} />
      </View>
      <FlatList
        data={categories}
        style={styles.scollContainer}
        renderItem={renderItem}
        numColumns={1}
        scrollEnabled={true}
      />
      <FAB
        icon="plus"
        style={styles.button}
        onPress={() => handlePress()} />
    </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scollContainer:{
    flex: 1,
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