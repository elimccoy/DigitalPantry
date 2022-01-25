import { StyleSheet, View, ScrollView } from 'react-native';
import * as React from 'react';
import { List,FAB, Portal, Provider, Appbar } from 'react-native-paper';
import ListItem from '../../../components/ListItem.js';
import SuggestedItem from '../../../components/SuggestedItem.js';



const ShoppingScreen = () => {

  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  const [listItems, setItems] = React.useState([["Oranges", "orange data","6"], ["Apples","apple data", "11"], ["Broccoli", "broccoli data", "1"]]);

  const [suggItems, setSugg] = React.useState([["Onions", "onion data","3"], ["Cheese","cheese data", "2"], ["Milk", "milk data", "3"]]);

  const [checkedItems, setChecked] = React.useState([]);

  const [checkChange, setChange] = React.useState([]);
  
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  const [visible, setVisible] = React.useState(true);

 /*
  function deleteChecked() {
    for (i = 0; i <checkedItems.length; i++){
      console.log("Checked item: " , i);
      setChecked(checkedItems.splice(i, 1));
   
    }

  }
  */
    
  /*
  handleCallback = (checkData) => {
    setChange({ checkChange: checkData });
    if (checkChange[0] == 1) { //if the box was checked
      setChecked(checkedItems.push([checkChange[1]]));
    } else {
      setChecked(checkedItems.splice(checkChange[1], 1));
    }
  }
  */

  
  function addItem() {
    listItems.push(["Bread", "bread data"," 1"]);
  }
  

  return(


    <ScrollView>
    <View style = {styles.container} >
      <Appbar.Header>
        <Appbar.Content title="Shopping Screen"  />
         
      </Appbar.Header>

     
      <List.Section title="Shopping List">
        <View>
          {listItems.map((i, index) => (<ListItem item = {i} key = {index} />))} 
        </View>
      </List.Section>

      
      <List.Section >
        <List.Accordion title="Suggested Items" expanded={expanded} onPress={handlePress}>
         {suggItems.map((i, index) => (<SuggestedItem item = {i} key = {index} idx = {index}/>))} 
        </List.Accordion>
      </List.Section>



      <Provider style={styles.container}>
        <Portal>
          <FAB.Group
            open={open}
            icon={'pencil'}
            actions={[
              { icon: 'minus', label: 'Delete all checked items', onPress: () => console.log("minus") },
              { icon: 'plus', label: 'Add items', onPress: () => addItem()},
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
      </Provider>

     

      
    </View>

    </ScrollView> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    

  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
   
});

export default ShoppingScreen;