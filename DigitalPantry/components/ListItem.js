import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { List, Checkbox} from 'react-native-paper';

/**
 * Display units
 * Styling
 */
const ListItem = ({item}) => {
    
    const [itm, setItm] = React.useState(item);
    const [amount, setAmount] = React.useState(itm.amount);
    const [name, setName] = React.useState(itm.name);
    const [data, setData] = React.useState(itm.info);
    const [key, setId] = React.useState(itm.key);

    const [checked, setChecked] = React.useState(false);

    return(
        <View >

            <List.Item title={name} description={data} left={() => <Checkbox.Android disabled={false} color={"blue"} uncheckedColor='grey' status={checked ? 'checked' : 'unchecked'} onPress={() => setChecked(!checked )} />}
                right={() => <Text> {amount} </Text>} />
 
        </View>

    );

}


const styles = StyleSheet.create({
    container: {
        flex:1,
        position: 'absolute', 
    },

 
});

export default ListItem;