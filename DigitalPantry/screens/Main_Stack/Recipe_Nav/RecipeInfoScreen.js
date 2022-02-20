import { StyleSheet, ScrollView } from 'react-native';
import { Title, Avatar, Paragraph } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';

const RecipeInfoScreen = ({ route, navigation }) => {

    const recipe = useSelector((state) => state.recipes.ingredients.find((item) => (item.id == route.params.id)));

    const handleExit = () => {
        navigation.navigate('PantryScreen');
    }

    const handleEdit = () => {
        navigation.navigate('PantryEditScreen', { key: recipe.id }); // send current recipe to edit screen
    }

    return (
        <ScrollView style={styles.container}>
            <Avatar.Image
                size={128}
                style={styles.image}
                source={{ uri: recipe.imageURL }} />
            <Title>Recipe Name:</Title>
            <Paragraph>{recipe.title}</Paragraph>
            <Title>Ingredients:</Title>
            <Paragraph>{recipe.ingredients}</Paragraph>
            <Title>Steps:</Title>
            <Paragraph>{recipe.steps}</Paragraph>
            <Title>Category:</Title>
            <Paragraph>{recipe.category}</Paragraph>

            <Button onPress={handleExit}> Done </Button>
            <Button onPress={ } > Edit </Button>
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
});

export default RecipeInfoScreen;