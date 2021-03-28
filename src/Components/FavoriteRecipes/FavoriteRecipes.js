import React from 'react'
import fire from "../SignIn/fire";
import RecipeGrid from "../Tile/RecipeGrid";

class FavoriteRecipes extends React.Component {
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
      <div style={{ backgroundColor: "rgb(202, 230, 240)", height: "100vh"}}>
        <h1 style={{marginBottom: "-2%"}}>Favorite Recipes</h1>
        <RecipeGrid recipes={this.state.favoriteRecipes} callback={this.getFavorites}/>
      </div>
    );
  }
}

export default FavoriteRecipes;
