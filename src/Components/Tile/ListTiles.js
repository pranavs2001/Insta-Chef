import Tile from "./tile";
import React from "react";

function ListTiles(props) {
  // console.log('props.recipies in listTiles is: ', props.recipes);
  return (
    Object.keys(props.recipes).map((id, index) =>
      <div>
        <p>{id}</p>
        <Tile recipeid={props.recipes[index]['id']}/>
      </div>
    )
  );
}

export default ListTiles;