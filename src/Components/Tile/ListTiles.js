import Tile from "./tile";
import React from "react";

function ListTiles(props) {
  console.log('props.recipies in listTiles is: ', props.recipes);
  return (
    <RecipeGrid recipes={props.recipes}/>
  );
}

export default ListTiles;