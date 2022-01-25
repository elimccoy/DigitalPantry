import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { Portal, Provider, Checkbox  } from 'react-native-paper';
import { List, Dialog, Button, Paragraph} from 'react-native-paper';


const ListItem = ({item}) => {
    
    const [itm, setItm] = React.useState(item);
    const [amount, setAmount] = React.useState(itm[2]);
    const [name, setName] = React.useState(itm[0]);
    const [data, setData] = React.useState(itm[1]);


    const [checked, setChecked] = React.useState(false);

    const [state, setState] = React.useState({ open: false });
  
    const onStateChange = ({ open }) => setState({ open });
  
    const { open } = state;


    const [visible, setVisible] = React.useState(false);

    //const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

 
 
    const displayDialog = () => {
        setVisible(true);
        console.log(visible);

        return(
            <View>
            <Provider >
                <View>
                    <Portal>
                        <Dialog visible={visible} dismissable = {true} onDismiss={hideDialog}>
                            <Dialog.Title>Alert</Dialog.Title>
                            <Dialog.Content>
                                <Paragraph>This is simple dialog</Paragraph>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={hideDialog}>Done</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                </View>
            </Provider>
            </View>

        );
    }
    
    /*
    handleCheck = (index) => {
        
        setChecked(!checked );
        if(!checked == true){ //user checked box
            parentCallback([1, index]);
        }else{  //user unchecked box, item needs to be removed from array of checked items
            parentCallback([0, index]);
        }
    }

    */

    return(
        <View >

            <List.Item title={name} description={data} onPress={displayDialog} left={() => <Checkbox.Android disabled={false} color={"blue"} uncheckedColor='grey' status={checked ? 'checked' : 'unchecked'} onPress={() => setChecked(!checked )} />}
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