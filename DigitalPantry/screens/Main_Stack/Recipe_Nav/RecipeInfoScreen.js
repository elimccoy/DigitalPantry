import { StyleSheet, ScrollView, View } from 'react-native';
import { Title, Avatar, Paragraph, Button, List } from 'react-native-paper';
import { useSelector } from 'react-redux';

const renderFractionOrInt = (x) => {
  if (x < 1) {
    return `1/${Math.round(1 / parseInt(x, 10))}`
  } else {
    return x.toString();
  }
};

const RecipeInfoScreen = ({ route, navigation }) => {
  const recipe = useSelector((state) => state.recipes.saved.find((item) => (item.id === route.params.id)));

  const handleExit = () => {
    navigation.navigate('RecipeScreen');
  }

  const handleEdit = () => {
    navigation.navigate('RecipeEditScreen', { id: recipe.id });
  }

  return (
    <ScrollView style={styles.container}>
      { recipe.imageURL && (
        <Avatar.Image
          size={128}
          style={styles.image}
          source={recipe.imageURL} />
      )}
      <Title>Recipe Name:</Title>
      <Paragraph>{recipe.title}</Paragraph>
      <Title>Ingredients:</Title>
      {recipe.ingredients.map((ingredient) => (
        <List.Item title={`${renderFractionOrInt(ingredient.ingCount)} ${ingredient.ingUnit} ${ingredient.ingName}`} />
      ))}
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
    paddingBottom: 20,
  },
  flexRow: {
    flexDirection: 'row',
  },
});

export default RecipeInfoScreen;