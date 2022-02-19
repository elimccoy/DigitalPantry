import { StyleSheet, View, ImageBackground } from 'react-native';
import { Badge } from 'react-native-paper';

const RecipeItem = ({ item }) => {

  return (
    <View style={styles.container}>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    elevation: 3,
    shadowColor: '#52006A',
  },
  backgroundImgStyle: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  backgroundImgStyleImageStyles: {
    borderRadius: 3,
  },
  statusBadge: {
    position: 'absolute',
    bottom: 7,
    left: 7,
    maxWidth: "70%",
  },
  nameBadge: {
    position: 'absolute',
    top: 7,
    right: 7,
    maxWidth: "70%",
  },
});

export default RecipeItem;