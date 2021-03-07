import React, {useState} from 'react'
import fire from "../SignIn/fire";
import RecipeGrid from "../Tile/RecipeGrid";

// Display favorite recipes
function FavoriteRecipes () {

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
    return (<RecipeGrid recipes={recipeIDs}/>);
  } else {
    return <p>No favorite recipes</p>
  }
}

export default FavoriteRecipes;