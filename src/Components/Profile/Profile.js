import React from 'react'
import fire from "../SignIn/fire";
import RecipeGrid from "../Tile/RecipeGrid";
import UserInfo from "./UserInfo";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteRecipes: [],
      uid: '',
    };
    this.getFavorites = this.getFavorites.bind(this);
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
        });
        this.setState({
          favoriteRecipes: recipeIDs,
          uid: uid,
        })
      });
    }
  }

  render() {
    return (
      <div>
        <h1>Favorite Recipes</h1>
        <hr/>
        <RecipeGrid recipes={this.state.favoriteRecipes} callback={this.getFavorites}/>
        <UserInfo/>
      </div>
    );
  }
}

export default Profile;
