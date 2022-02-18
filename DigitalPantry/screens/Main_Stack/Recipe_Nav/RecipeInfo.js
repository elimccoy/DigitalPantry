import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import { Title, Avatar, Paragraph } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useSelector, useDispatch } from 'react-redux';

const PantryItemInfoScreen = ({ route, navigation }) => {

    const item = useSelector((state) => state.recipes.ingredients.find((i) => (i.key == route.params.key)));

    console.log(item);

    return (
        <ScrollView style={styles.container}>
            <Avatar.Image
                size={128}
                style={styles.image}
                source={{ uri: item.image }} />
            <Title>Recipe Name:</Title>
            <Paragraph>{item.name}</Paragraph>
            <Title>Expiration date:</Title>
            <Paragraph>{item.expirationDate.toString().slice(0, 16)}</Paragraph>
            <Title>Amount:</Title>
            <Paragraph>{item.amount}</Paragraph>
            <Title>Unit of measurement:</Title>
            <Paragraph>{item.unit}</Paragraph>
            <Title>Brand:</Title>
            <Paragraph>{item.brand}</Paragraph>
            <Title>Description:</Title>
            <Paragraph>{item.description}</Paragraph>
            <Title>Remaining:</Title>
            <Paragraph>{item.remaining}</Paragraph>
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

export default PantryItemInfoScreen;