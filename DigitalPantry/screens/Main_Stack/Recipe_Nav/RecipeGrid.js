import { ScrollView } from 'react-native';
import React from 'react';
import RecipeRow from "./RecipeRow";

// Outer Recipe scrollview holding recipe row
// Map each row to incoming filtered recipe
const RecipeGrid = ({ rowList}) => {
  return (
    <ScrollView
      vertical={true}
    >
      {rowList.map(row => (
        <RecipeRow key={row.title} recipes={row.recipes} />
      ))}
    </ScrollView>
  );
};

export default RecipeGrid