import React from 'react'
import fire from "../SignIn/fire";
import ListTiles from "../Tile/ListTiles";

// Display favorite recipes
function FavoriteRecipes (props) {
  if (fire.auth().currentUser) {
    const uid = fire.auth().currentUser.uid;
    // Automatically create "other" category if it doesn't exist
    let recipeIDs = [];
    let pantryRef = fire.database().ref(uid + '/favorites').orderByChild('id');
    pantryRef.on('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        recipeIDs.push({
          'id': childSnapshot.val()['id'],
          'name': childSnapshot.val()['name'],
        })
      });
    });
    return (<ListTiles recipes={recipeIDs}/>);
  } else {
    return <p>No favorite recipes</p>
  }
}

export default FavoriteRecipes;