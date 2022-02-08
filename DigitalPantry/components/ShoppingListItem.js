import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as React from 'react';
import { List, Checkbox} from 'react-native-paper';

/**
 * Display units
 * Styling
 */
const ShoppingListItem = ({item}) => {
    
    const [itm, setItm] = React.useState(item);
    const [amount, setAmount] = React.useState(itm.amount);
    const [name, setName] = React.useState(itm.name);
    const [data, setData] = React.useState(itm.info);
    const [key, setId] = React.useState(itm.key);

    const [checked, setChecked] = React.useState(false);

    return (

        <List.Item title={item.name} description={item.data} left={() => <Checkbox.Android disabled={false} color={"blue"} uncheckedColor='grey' status={checked ? 'checked' : 'unchecked'} onPress={() => setChecked(!checked)} />}
            right={() => <Text> {item.amount} </Text>} />

    );

}


const styles = StyleSheet.create({
    container: {
        flex:1,
        position: 'absolute', 
    },

 
});

export default ShoppingListItem;