import { StyleSheet,ScrollView,} from 'react-native';
import React from 'react';
import RecipeRow from "./RecipeRow";

const RecipeGrid = ({ rowList }) => {

  return (
    <ScrollView
      vertical={true}
    >
      {rowList.map(row => (  
        <RecipeRow recipes={row} /> 
      ))}

    </ScrollView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default RecipeGrid