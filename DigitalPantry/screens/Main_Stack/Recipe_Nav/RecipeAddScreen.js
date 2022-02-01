import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {Button, Card, Title} from 'react-native-paper';

const RecipeAddScreen = ({ route, navigation }) => {

    console.debug("Saved and functioning");

    return (


        <View style={styles.container}>



            <StatusBar style="dark" translucent={false} backgroundColor='white' />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        flexWrap: 'wrap',
        flexDirection: 'row'
        //justifyContent: 'center',
        //alignItems: 'center',
    },


});

export default RecipeAddScreen;