import React from 'react'
import fire from "../SignIn/fire";
import RecipeGrid from "../Tile/RecipeGrid";


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteRecipes: [],
      userEmail: '',
      userName: '',
    };
    this.callback = this.callback.bind(this);
  }

  componentDidMount() {
    this.getFavorites()
  }

  getFavorites() {
    if (fire.auth().currentUser) {
      const uid = fire.auth().currentUser.uid;
      // Automatically create "other" category if it doesn't exist
      let pantryRef = fire.database().ref(uid + '/favorites').orderByChild('id');
      pantryRef.on('value', (snapshot) => {
        let recipeIDs = [];
        snapshot.forEach((childSnapshot) => {
          recipeIDs.push({
            'id': childSnapshot.val()['id'],
            'name': childSnapshot.val()['name'],
          });
          this.setState({
            favoriteRecipes: recipeIDs,
          })
        });
      });
    }
  }

  // callback is used to update list of favorite recipes when one is removed
  callback() {
    this.getFavorites()
  }

  render() {
    return (
      <div>
        <h1>Favorite Recipes</h1>
        <hr/>
        <RecipeGrid recipes={this.state.favoriteRecipes} callback={this.callback}/>
      </div>
    );
  }
}

export default Profile;
