import { StyleSheet, View, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import PantryItem from '../components/PantryItem';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Title } from 'react-native-paper';

const numColumns = 2;

const PantryCategoryBlock = ({category, navigation}) => {

  //Redux data
  const data = useSelector((state) => state.pantry.ingredients);
  const [isOpen, setIsOpen] = useState(true);

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

  return(
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.catrgoryTitle}
        onLongPress={() => {isOpen ? setIsOpen(false) : setIsOpen(true)}}
      >
        <Title style={styles.textColorWhite}>{category}</Title>
      </TouchableOpacity>
      <FlatList
        data={data}
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
    width: '100%'
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
    height: 0
  },
  catrgoryTitle : {
    paddingLeft: 7,
    backgroundColor: '#6200EE',
    margin: 3,
    borderRadius: 3,
  },
  textColorWhite: {
    color: 'white'
  }
});

export default PantryCategoryBlock;