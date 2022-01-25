import { StyleSheet, Text, View } from 'react-native';
import {List, IconButton} from 'react-native-paper';
import * as React from 'react';



const SuggestedItem = ({item}) => {
    
    const [itm, setItm] = React.useState(item);
    const [amount, setAmount] = React.useState(itm[2]);
    const [name, setName] = React.useState(itm[0]);
    const [data, setData] = React.useState(itm[1]);

    return(
        <View >

            <List.Item title={name} description={data} left={() => <IconButton icon="plus-circle" 
                size={20} onPress={() => console.log('Pressed')}/>} right={() => <Text> {amount} </Text>} />
 
        </View>

    );

}


const styles = StyleSheet.create({
    container: {
        flex:1, 
    }

});

export default SuggestedItem;