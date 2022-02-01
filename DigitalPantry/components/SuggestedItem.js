import { StyleSheet, Text, View } from 'react-native';
import {List, IconButton} from 'react-native-paper';
import * as React from 'react';
/**TO-DO
 * Styling: change '+' color
 * Display units
 * */


const SuggestedItem = ({item,addItem}) => { //takes in function addItem and also item
    
    const [itm, setItm] = React.useState(item);
    const [amount, setAmount] = React.useState(itm.amount);
    const [name, setName] = React.useState(itm.name);
    const [data, setData] = React.useState(itm.info);
    const [key, setId] = React.useState(itm.key);


    return(
        <View >

            <List.Item title={name} description={data} left={() => <IconButton icon="plus-circle" 
                size={20} onPress={() => addItem(itm)}/>} right={() => <Text> {amount} </Text>} />
 
        </View>

    );

}


const styles = StyleSheet.create({
    container: {
        flex:1, 
    }

});

export default SuggestedItem;