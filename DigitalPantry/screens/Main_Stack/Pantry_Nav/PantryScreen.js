/**
 * Name: PantryScreen.js
 * Desc: React native screen that allows the to view more details about the pantry item selected.
 * File type: Screen
*/

import { StyleSheet, View, FlatList } from 'react-native';
import { FAB, Searchbar } from 'react-native-paper';
import { pantryItemCategories } from '../../../data/PantryItemData';
import { useSelector } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';
import PantryCategoryBlock from '../../../components/PantryCategoryBlock';
import { useFocusEffect } from "@react-navigation/core";

const PantryScreen = ({ navigation }) => {

  //States:
  const [query, onChangeQuery] = useState(""); //Search Query state
  const data = useSelector((state) => state.pantry.ingredients);
  const [curRenderData, setCurRenderData] = useState(data);

  //Update current data on navigation back to page.
  useFocusEffect(
    useCallback(() => {
      setCurRenderData(data);
    }, [data]),
  );

  //Handle Query complete search.
  const handleQueryComplete = useCallback(() => {

    //If query is empty render normal data.
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

    setCurRenderData(toSetData);
  }, [query, data]);

  //Effect for query to update on query change.
  useEffect(() => {
    handleQueryComplete();
  }, [handleQueryComplete]);

  //Handle add item.
  const handlePress = () => {
    navigation.navigate('BarcodeScreen');
  }

  /**
   * Name: renderItem
   * Desc: Returns a new render pantry item for flat list.
   * @param {item, index}
   * @returns renderItem
   */
  const renderItem = ({item, index}) => {
    return (
      <PantryCategoryBlock
        navigation={navigation}
        category={item.catName}
        data={curRenderData}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <Searchbar
          placeholder="Search"
          onChangeText={(res) => { onChangeQuery(res) }}
          value={query}
          style={styles.searchBar} />
      </View>
      <FlatList
        data={pantryItemCategories}
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