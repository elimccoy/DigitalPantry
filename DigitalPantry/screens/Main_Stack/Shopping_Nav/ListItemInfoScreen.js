import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import { Title, Avatar, Paragraph } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';

/**
 * Screen that displays a shopping list item's data. Takes in an item's key.
 */

const ListItemInfoScreen = ({ route }) => {

    const item = useSelector((state) => state.shoppingList.list.find((item) => (item.key == route.params.key))); // finds item in shopping list using key

    // displays item's data relevant for shopping
    return (
        <ScrollView style={styles.container}>
            <Avatar.Image
                size={128}
                style={styles.image}
                source={{ uri: item.image }} />
            <Title>Name:</Title>
            <Paragraph>{item.name}</Paragraph>
            <Title>Amount:</Title>
            <Paragraph>{item.amount}</Paragraph>
            <Title>Unit of measurement:</Title>
            <Paragraph>{item.unit}</Paragraph>
            <Title>Brand:</Title>
            <Paragraph>{item.brand}</Paragraph>
            <Title>Description:</Title>
            <Paragraph>{item.description}</Paragraph>
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

export default ListItemInfoScreen;