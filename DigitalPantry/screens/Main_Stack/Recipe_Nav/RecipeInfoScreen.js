import { StyleSheet, ScrollView, View } from 'react-native';
import { Title, Avatar, Paragraph, Button } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';

const RecipeInfoScreen = ({ route, navigation }) => {

    // Redux state
    const recipe = useSelector((state) => state.recipes.saved.find((item) => (item.id === route.params.id)));

    // Exit and edit buttons
    const handleExit = () => {
        navigation.navigate('RecipeScreen');
    }

    const handleEdit = () => {
        navigation.navigate('RecipeEditScreen', { id: recipe.id });
    }

    return (
        <ScrollView style={styles.container}>
            <Avatar.Image
                size={128}
                style={styles.image}
                source={recipe.imageURL} />
            <Title>Recipe Name:</Title>
            <Paragraph>{recipe.title}</Paragraph>
            <Title>Ingredients:</Title>
            <Paragraph>{recipe.ingredients}</Paragraph>
            <Title>Steps:</Title>
            <Paragraph>{recipe.steps}</Paragraph>
            <Title>Category:</Title>
            <Paragraph>{recipe.category}</Paragraph>

            <View style={styles.flexRow}>
                <View style={styles.buttonContainer}>
                    <Button icon="check" mode="contained" onPress={handleExit}>
                        Done
                    </Button>
                </View>
                <View style={styles.buttonContainer}>
                    <Button icon="pencil" mode="contained" onPress={handleEdit}>
                        Edit
                    </Button>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        padding: 10,
    },
    image: {
        alignSelf: 'center',
        marginTop: 30,
    },
    buttonContainer: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
    },
    flexRow: {
        flexDirection: 'row',
    },
});

export default RecipeInfoScreen;