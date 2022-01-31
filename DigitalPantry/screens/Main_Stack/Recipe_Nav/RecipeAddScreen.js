import { InputAccessoryView, Keyboard, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, TouchableOpacityBase, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph, TextInput } from 'react-native-paper';
import UploadImage from './UploadImage';

const RecipeAddScreen = ({ route, navigation }) => {

    const { recipeName, onChangeName } = React.useState("Recipe Name");
    const { ingList, onChangeIng } = React.useState("Ingredients");
    const { recipeInfo, onChangeRecipe } = React.useState("Lorem ipsum dolor sit amet");

    return (

        <ScrollView>

            {/* REQUIRES npm install expo-image-picker */}
            <UploadImage />
            <View >
                <TextInput
                    style={styles.recipeName}
                    onEndEditing={onChangeName}
                    value={recipeName}
                    placeholder="Recipe Name"
                    inputAccessoryViewID="Done"
                />
            </View>
            <View >
                <TextInput
                    style={styles.defaultInput}
                    onEndEditing={onChangeIng}
                    value={ingList}
                    placeholder="Ingredients"
                    inputAccessoryViewID="Done"
                />
            </View>
            <View >
                <TextInput
                    style={styles.multilineInput}
                    onChangeText={onChangeRecipe}
                    value={recipeInfo}
                    multiline={true}
                    placeholder="Lorem ipsum dolor sit amet"
                    inputAccessoryViewID="Done"
                />
            </View>
            <View paddingHorizontal={12} alignItems={'left'}>
                <TouchableOpacity
                    style={styles.saveRecipeButton}
                    onPress={() => navigation.navigate('RecipeScreen')}
                >
                    <Text style={{color: 'white', fontSize: 20, textAlign: 'center', marginTop: '15%'}}>
                        Save
                    </Text>
                </TouchableOpacity>
            </View>


            <StatusBar style="dark" translucent={false} backgroundColor='white' />

            <InputAccessoryView nativeID="Done">
                <View style={styles.accessory}>
                    <TouchableOpacity
                        onPress={() => Keyboard.dismiss()}
                    >
                        <Text style={styles.doneButton}>
                            Done
                        </Text>
                    </TouchableOpacity>
                </View>
            </InputAccessoryView>

        </ScrollView>


    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        flexWrap: 'wrap',
        flexDirection: 'column',
        //justifyContent: 'center',
        //alignItems: 'center',
    },
    recipeName: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 2,
        fontSize: 36,
    },
    defaultInput: {
        height: 36,
        margin: 12,
        borderWidth: 1,
        padding: 2,
        fontSize: 18,
    },
    multilineInput: {
        margin: 12,
        borderWidth: 1,
        padding: 2,
        fontSize: 18,
    },
    accessory: {
        width: '100%',
        height: 48,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        paddingHorizontal: 8
    },
    doneButton: {
        color: '#007AFF',
        fontSize: 17
    },
    saveRecipeButton: {
        height: 48,
        width: '25%',
        backgroundColor: '#007AFF',
        borderRadius: 8,
        padding: 2,
        paddingHorizontal: 8,
        alignItems: 'center',
        
    }

});

export default RecipeAddScreen;