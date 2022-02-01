import { StyleSheet, View, ScrollView } from 'react-native';
import * as React from 'react';
import { List,FAB, Portal, Appbar} from 'react-native-paper';
import ListItem from '../../../components/ListItem.js';
import SuggestedItem from '../../../components/SuggestedItem.js';

  /*TO-DO:
  -implement delete/edit function for individual list elements in ListDeleteScreen
  -implement delete all checked items function from the FAB
  -display units for each item
  -Styling: Fix FAB positioning, appearance when switching from one screen back to ShoppingScreen, colors.
  */


const list = [{key : '1', name : 'Oranges',  info : 'orange data', amount : '6'}, {key :'2', name : 'Apples', info : 'apple data', amount : '11'}, {key : '3', name : 'Broccoli', info:'broccoli data', amount:'1'}];

const suggested =[{ key : '4',name : 'Onions', info:'onion data',amount : '3'}, {key :'5',name :'Cheese',info:'cheese data', amount:'2'}, { key :'6', name :'Milk', info:'milk data', amount:'3'}];

const ShoppingScreen = ({route, navigation}) => {

  if(route.params !== undefined ) { //check if data from route is already in list, if not, add it
    let { newItem } = route.params; 
    let exists = false;
    for(let i = 0; i < list.length; i++) {
      if(list[i].key === newItem.key) {
        /*Edit existing item*/
        exists = true;
        break;
      }
    }
    if(!exists){
      list.push(newItem);
    }
  };

  const [listItems, setList] = React.useState(list);
  const [suggItems, setSugg] = React.useState(suggested);
  const [showFab, setShowFab] = React.useState(true);
  const [expanded, setExpanded] = React.useState(true);
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  const handlePress = () => setExpanded(!expanded);

  const manualAdd = () => { //navigate to ListAddScreen to get user's input
    navigation.navigate('ListAddScreen');
    setList(list);
  };
  
  //to add an item from the suggested items list, this is passed to <SuggestedItem>
  const addSugg = (item) => {
 
    //make copy of list
    const newList = new Array((list.length)+1);
    for (let i=0; i<newList.length;i++){
      if(i == (newList.length -1)){
        newList[i] = item;
      }else{
        newList[i] = list[i];
      }
    }
    
    list.push(item); //add item to list
    setList(list);
  

    //remove item from suggested list
    const filteredArr = suggItems.filter((itm) => (itm.key !== item.key));
    setSugg(filteredArr);

  }

  const deleteItem = (item) =>{ //TO-DO: changed to screen, implement screen
  }

  return(


    <ScrollView>
      <View style={styles.container} >
        <Appbar.Header>
          <Appbar.Content title="Shopping Screen" />

        </Appbar.Header>
        
        <List.Section title="Shopping List" titleStyle={styles.listTitle}>
          <View>
            {listItems.map((i) => (<ListItem item={i} key={i.key} />))}
          </View>
        </List.Section>


        <List.Section>
          <List.Accordion title="Suggested Items" titleStyle={styles.listTitle} expanded={expanded} onPress={handlePress}>
            {suggItems.map((i) => (<SuggestedItem item={i} key={i.key} addItem = {addSugg}/>))}
          </List.Accordion>
          
        </List.Section>

      </View>

     
      <Portal>
          <FAB.Group
            visible = {showFab}
            open={open}
            icon={'pencil'}
            style = {styles.fab}
            actions={[
              { icon: 'minus', label: 'Delete all checked items', onPress: () => console.log("minus") },
              { icon: 'plus', label: 'Add items', onPress: () => manualAdd() },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
                // do something if the speed dial is open
              }
            }}
          />
      </Portal>
    

    </ScrollView> 

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    flex: 1,
    right: 0,
    bottom: 0,
    borderRadius: 20,
    padding: 35,
    elevation: 50
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