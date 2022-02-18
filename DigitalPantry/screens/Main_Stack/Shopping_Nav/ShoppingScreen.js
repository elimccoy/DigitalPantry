import { StyleSheet, View, ScrollView, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { List, FAB, useTheme, Checkbox } from 'react-native-paper';
import ShoppingListItem from '../../../components/ShoppingListItem.js';
import SuggestedItem from '../../../components/SuggestedItem.js';
import LoadingScreen from '../LoadingScreen.js';
import ContextualActionBar from './ContextualActionBar';
import { useNavigation } from '@react-navigation/native';
import CustomNavigationBar from './CustomNavigationBar.js';

/*TO-DO:
-implement select & delete all selected items 
-Styling: fix scrolling
*/

const list = [{ key: '1', name: 'Oranges', info: 'orange data', amount: '6' }, { key: '2', name: 'Apples', info: 'apple data', amount: '11' }, { key: '3', name: 'Broccoli', info: 'broccoli data', amount: '1' }];
const numColumns = 2;
const suggested = [{ key: '4', name: 'Onions', info: 'onion data', amount: '3' }, { key: '5', name: 'Cheese', info: 'cheese data', amount: '2' }, { key: '6', name: 'Milk', info: 'milk data', amount: '3' }];

const ShoppingScreen = ({ route, navigation }) => {
  const [listItems, setList] = useState(list);
  const [suggItems, setSugg] = useState(suggested);
  const [showFab, setShowFab] = useState(true);
  const [expanded, setExpanded] = useState(true);
  const [state, setState] = useState({ open: false });
  const [cabIsOpen, setCabIsOpen] = useState(false);
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  const handlePress = () => setExpanded(!expanded);



  useEffect(() => {
    if (route.params !== undefined) { //check if data from route is already in list, if not, add it
      let { newItem } = route.params;
      let isNew = true;
      for (let i = 0; i < list.length; i++) {

        if (list[i].key === newItem.key && newItem.name === undefined) { //delete item
          isNew = false;
          list.splice(i, 1);

        } else if (list[i].key === newItem.key) { //edit item
          isNew = false;
          let newElem = { key: newItem.key, name: newItem.name, info: newItem.info, amount: newItem.amount };
          list[i] = newElem;
          break;
        }
      }

      if (isNew) { //add item
        list.push(newItem);
      }

      const newList = new Array((list.length));
      for (let i = 0; i < newList.length; i++) {
        let anotherElem = { key: list[i].key, name: list[i].name, info: list[i].info, amount: list[i].amount };
        newList[i] = anotherElem;
      }
      setList(newList);
    };
    
  }, [route.params]); //everytime parameters change

 
  useEffect(() => {
    if (cabIsOpen === true) {
      //render cab
      //console.log("open cab effect: " + cabIsOpen);
      navigation.setOptions({
        header: (props) => (<ContextualActionBar {...props} />)
      });
    } else {
      navigation.setOptions({ header: (props) => <CustomNavigationBar {...props} /> });
    }

  }, [cabIsOpen]);

  const openHeader = () => {
    setCabIsOpen(true);
  }

  const closeHeader = () => {
    setCabIsOpen(false);
    //unselect items
  }
  const deleteSelected = () => {

  }


  const manualAdd = () => { //navigate to ListAddScreen to get user's input to add custom item
    navigation.navigate('ListAddScreen');
    setList(list);
  };

  //to add an item from the suggested items list, this is passed to <SuggestedItem>
  const addSugg = (item) => {

    //make copy of list
    const newList = new Array((list.length) + 1);
    for (let i = 0; i < newList.length; i++) {
      if (i == (newList.length - 1)) {
        newList[i] = item;
      } else {
        newList[i] = list[i];
      }
    }

    list.push(item); //add item to list
    setList(list);

    //remove item from suggested list
    const filteredArr = suggItems.filter((itm) => (itm.key !== item.key));
    setSugg(filteredArr);

    console.log(filteredArr);
  }

  //Handle long press of item.
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onLongPress={() => { navigation.navigate('ListEditDeleteScreen', { itemToEdit: item }) }}
        onPress={() => { handlePress() }}
        key={item.key}
      >
        <ShoppingListItem item={item} key={item.key} />
      </TouchableOpacity>
    );
  };

  //Handle long press of suggested item.
  const renderSuggestedItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        key={item.key}
      >
        <SuggestedItem item={item} key={item.key} addItem={addSugg} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container} >

      <FlatList
        data={listItems}
        style={styles.scollContainer}
        renderItem={renderItem}
        numColumns={numColumns}
      />

      <FlatList
        data={suggItems}
        style={styles.scollContainer}
        renderItem={renderSuggestedItem}
        numColumns={numColumns}
      />

      <FAB.Group
        visible={showFab}
        open={open}
        icon={'pencil'}
        style={styles.fab}
        actions={[
          { icon: 'checkbox-marked-circle', label: 'Select items', onPress: () => openHeader() },
          { icon: 'plus', label: 'Add items', onPress: () => manualAdd() },
        ]}
        onStateChange={onStateChange}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    elevation: 3,
    shadowColor: '#52006A',
  },
  scollContainer: {
    flex: 1,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    height: Dimensions.get('window').width / numColumns, // approximate a square
    width: Dimensions.get('window').width / numColumns - 10,
  },
  backgroundImgStyle: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  backgroundImgStyleImageStyles: {
    borderRadius: 3,
  },
  statusBadge: {
    position: 'absolute',
    bottom: 7,
    left: 7,
    maxWidth: "70%",
  },
  nameBadge: {
    position: 'absolute',
    top: 7,
    right: 7,
    maxWidth: "70%",
  },
  check: {
    position: 'absolute',
    top: 7,
    left: 7,
    maxWidth: "20%",
    color: "purple",
  },
  fab: {
    margin: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
  listTitle: {
    color: '#6200EE',
    fontWeight: "bold",
  },
});

export default ShoppingScreen;