import React from 'react'
import FavoriteRecipes from "./FavoriteRecipes";

/* TODO: Convert to a class
Re-render when the list of favorite recipes is updated
Provide user information (email and password)
 */

function Profile (props) {
  return (
    <div>
      <h1>Favorite Recipes</h1>
      <hr/>
      <FavoriteRecipes/>
    </div>
  );
}

export default Profile