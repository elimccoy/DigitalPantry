import { StyleSheet,ScrollView,} from 'react-native';
import React from 'react';
import RecipeRow from "./RecipeRow";

// takes in list of rows
const RecipeGrid = ({ rowList }) => {

  return (
    <ScrollView
      vertical={true}
    >
      {rowList.map(row => (  // for every item in rowList, row
        <RecipeRow recipes={row} /> // call RecipeRow on row
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