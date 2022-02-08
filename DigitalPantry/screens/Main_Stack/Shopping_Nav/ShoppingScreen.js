import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import * as React from 'react';
import { List, FAB, Portal, Appbar } from 'react-native-paper';
import ShoppingListItem from '../../../components/ShoppingListItem.js';
import SuggestedItem from '../../../components/SuggestedItem.js';


/*TO-DO:
-implement delete all checked items function from the FAB
-display units for each item
*/


const list = [{ key: '1', name: 'Oranges', info: 'orange data', amount: '6' }, { key: '2', name: 'Apples', info: 'apple data', amount: '11' }, { key: '3', name: 'Broccoli', info: 'broccoli data', amount: '1' }];

const suggested = [{ key: '4', name: 'Onions', info: 'onion data', amount: '3' }, { key: '5', name: 'Cheese', info: 'cheese data', amount: '2' }, { key: '6', name: 'Milk', info: 'milk data', amount: '3' }];

const ShoppingScreen = ({ route, navigation }) => {

  const [listItems, setList] = React.useState(list);
  const [suggItems, setSugg] = React.useState(suggested);
  const [showFab, setShowFab] = React.useState(true);
  const [expanded, setExpanded] = React.useState(true);
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  const handlePress = () => setExpanded(!expanded);

  React.useEffect(() => {
    if (route.params !== undefined) { //check if data from route is already in list, if not, add it
      let { newItem } = route.params;
      var isNew = true;
      for (let i = 0; i < list.length; i++) {

        if (list[i].key === newItem.key && newItem.name === undefined) { //delete item
          isNew = false;
          list.splice(i, 1);

        } else if (list[i].key === newItem.key) { //edit item
          isNew = false;
          var newElem = { key: newItem.key, name: newItem.name, info: newItem.info, amount: newItem.amount };
          list[i] = newElem;
          break;
        }
      }

      if (isNew) { //add item
        list.push(newItem);
      }

      const newList = new Array((list.length));
      for (let i = 0; i < newList.length; i++) {
        var anotherElem = { key: list[i].key, name: list[i].name, info: list[i].info, amount: list[i].amount };
        newList[i] = anotherElem;
      }
      setList(newList);
    };
  }, [route.params]); //everytime parameters change


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

  }




  return (


    <View style={styles.container} >
      <ScrollView style={styles.container}>

        <List.Section title="Shopping List" titleStyle={styles.listTitle}>

          {listItems.map((i) =>
            <TouchableOpacity onLongPress={() => { navigation.navigate('ListEditDeleteScreen', { itemToEdit: i }) }} key={i.key}>
              <ShoppingListItem item={i} key={i.key} />
            </TouchableOpacity>)}

        </List.Section>


        <List.Section style={styles.listSection}>
          <List.Accordion title="Suggested Items" titleStyle={styles.listTitle} expanded={expanded} onPress={handlePress}>
            {suggItems.map((i) => (<SuggestedItem item={i} key={i.key} addItem={addSugg} />))}
            <List.Item />
          </List.Accordion>

        </List.Section>

      </ScrollView>
      <FAB.Group
        visible={showFab}
        open={open}
        icon={'pencil'}
        style={styles.fab}
        actions={[
          { icon: 'minus', label: 'Delete all checked items', onPress: () => console.log("minus") },
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
  },

  fab: {

    margin: 0,
    right: 0,
    bottom: 0,

    position: 'absolute',

  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },

  listTitle: {
    color: '#6200EE',
    fontWeight: "bold",
  },


});

export default ShoppingScreen;