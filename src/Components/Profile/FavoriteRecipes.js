import React from 'react'
import fire from "../SignIn/fire";
import ListTiles from "../Tile/ListTiles";

// Display favorite recipes
function FavoriteRecipes (props) {
  if (fire.auth().currentUser) {
    const uid = fire.auth().currentUser.uid;
    // Automatically create "other" category if it doesn't exist
    let pantryRef = fire.database().ref(uid + '/favorites').orderByChild('items');
    pantryRef.on('value', (snapshot) => {
      let recipeIDs = [];
      snapshot.forEach((childSnapshot) => {
        recipeIDs.push(childSnapshot.val())
      });
      return <ListTiles recipes={recipeIDs}/>
    });
  }
}

export default FavoriteRecipes;