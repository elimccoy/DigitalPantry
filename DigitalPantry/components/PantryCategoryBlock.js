import { StyleSheet, View, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import PantryItem from '../components/PantryItem';
import { useState, useEffect } from 'react';
import { Title } from 'react-native-paper';

const numColumns = 2;

const PantryCategoryBlock = ({category, navigation, data}) => {

  //Redux data:
  const [isOpen, setIsOpen] = useState(true);
  const [renderData, setRenderData] = useState(data);

  //Handle long press of item.
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onLongPress={() => {navigation.navigate('EditScreen', {key:item.key})}}
        onPress={() => {navigation.navigate("InfoScreen",{key:item.key})}}
      >
        <PantryItem item={item}/>
      </TouchableOpacity>
    );
  };

  //On data change, render correct data and open all tabs.
  useEffect(() => {

    let renderCategoryData = [];
    for(let i = 0; i < data.length; i++) {
      if(data[i].category === category) {
        renderCategoryData.push(data[i]);
      }
    }
    setRenderData(renderCategoryData);
    setIsOpen(true);
  }, [data]);

  return(
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.catrgoryTitle}
        onLongPress={() => {isOpen ? setIsOpen(false) : setIsOpen(true)}}
      >
        <Title style={styles.textColorWhite}>{category}</Title>
      </TouchableOpacity>
      <FlatList
        data={renderData}
        style={isOpen ? styles.scollContainer : styles.hidden}
        renderItem={renderItem}
        numColumns={numColumns}
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    width: '100%',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    height: Dimensions.get('window').width / numColumns, // approximate a square
    width: Dimensions.get('window').width / numColumns - 10,
  },
  scollContainer:{
    flex: 1,
  },
  hidden:{
    height: 0,
  },
  catrgoryTitle : {
    paddingLeft: 7,
    backgroundColor: '#6200EE',
    margin: 3,
    borderRadius: 3,
  },
  textColorWhite: {
    color: 'white',
  },
});

export default PantryCategoryBlock;