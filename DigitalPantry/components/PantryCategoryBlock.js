import { StyleSheet, View, FlatList,TouchableOpacity, Dimensions } from 'react-native';
import PantryItem from '../components/PantryItem';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Title } from 'react-native-paper';

const numColumns = 2;

const PantryCategoryBlock = ({category, navigation}) => {

  //Redux data
  const data = useSelector((state) => state.pantry.ingredients);
  const [curRenderData, setCurRenderData] = useState(null); //Data items being shown. Adjusted by query.

  //Did mount.
  useEffect(() => {
    setCurRenderData(data);//Load init data.
  }, [data]);

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
      <View style={styles.catrgoryTitle}>
        <Title style={styles.textColorWhite}>{category}</Title>
      </View>
      <FlatList
        data={curRenderData}
        style={styles.scollContainer}
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