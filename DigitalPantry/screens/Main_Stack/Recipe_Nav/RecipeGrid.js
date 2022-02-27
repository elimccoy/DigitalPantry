import { ScrollView } from 'react-native';
import React from 'react';
import RecipeRow from "./RecipeRow";
import { useState, useEffect} from 'react';

const RecipeGrid = ({ rowList}) => {

  //const [renderData, setRenderData] = useState(rowList);

  
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