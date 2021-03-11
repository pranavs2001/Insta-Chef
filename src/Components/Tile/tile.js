import React from 'react';
import './tile.css';
import RecipeWindow from './recipewindow'
import CheckError from "../MealDB/checkerror";
import fire from "../SignIn/fire";

class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
      loaded: false,
      recipeOpen: false,
      loggedIn: false,
      favoriteRecipe: false,
      recipeKey: null,
    };
    this.openRecipe = this.openRecipe.bind(this);
    this.afterOpenRecipe = this.afterOpenRecipe.bind(this);
    this.closeRecipe = this.closeRecipe.bind(this);
    this.processMeal = this.processMeal.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  componentDidMount() {
    // Fetch the information for this specified recipe id
    const url = 'https://www.themealdb.com/api/json/v1/1/lookup.php?';
    const params = { 'i': this.props.recipeid };
    fetch(url + new URLSearchParams(params))
    .then(CheckError)
    .then(result => {
      const recipeinfo = result['meals'][0];
      this.processMeal(recipeinfo);
    })
    .catch(error => console.log(error));

    // Check if this recipe has been favorited by the user
    if (fire.auth().currentUser) {
      let uid = fire.auth().currentUser.uid;
      let recipeRef = fire.database().ref(uid + '/favorites').orderByChild('items');
      recipeRef.on('value', (snapshot) => {
        // check this recipe against all the recipes in the favorite list
        snapshot.forEach((childSnapshot) => {
          if (this.props.recipeid === childSnapshot.val()['id']) {
            this.setState({
              favoriteRecipe: true,
              recipeKey: childSnapshot.key,
            });
          }
        })
      });
      // register the user as logged in so the "Add New Ingredient" button appears
      this.setState({
        loggedIn: true,
      })
    }
  }

  // Prevent memory leaks
  componentWillUnmount() {
   this.setState = (state, callback) => {
     return;
   }
  }

  // Extract the relevant recipe information
  processMeal(recipeInfo) {
    let ingredients = {};
    for (let i = 1; i <= 20; i++) {
      if (recipeInfo['strIngredient' + i.toString()]) {
        ingredients[recipeInfo['strIngredient' + i.toString()]] = recipeInfo['strMeasure' + i.toString()];
      }
    }
    const data = {
      'name': recipeInfo['strMeal'],
      'category': recipeInfo['strCategory'],
      'area': recipeInfo['strArea'],
      'ingredients': ingredients,
      'instructions': recipeInfo['strInstructions'],
      'image': recipeInfo['strMealThumb'],
      'video': recipeInfo['strYoutube'],
      'source': recipeInfo['strSource']
    };
    this.setState({
      loaded: true,
      recipe: data,
    });
  }

  // Modal window control
  openRecipe() {
    this.setState({
      recipeOpen: true,
    });
  }

  afterOpenRecipe() {
    // Stylistic changes after modal window opens
  }

  //close modal window
  closeRecipe() {
    this.setState({
      recipeOpen: false,
    });
  }

  toggleFavorite() {
    if (this.state.loggedIn) {
      // If this recipe is already a favorite, remove it from firebase
      const uid = fire.auth().currentUser.uid;
      if (this.state.favoriteRecipe) {
        // remove the recipe from firebase
        const recipeKey = this.state.recipeKey.toString();
        let ref = fire.database().ref(uid + '/favorites/' + recipeKey);
        ref.set({item: null})
            .catch(err => {console.log('Error: ', err);});
        // Set the locally stored recipe key to null
        this.setState({recipeKey: ''})
      } else {
        // add the recipe to Firebase
        let itemRef = fire.database().ref(uid + '/favorites');
        let newItemRef = itemRef.push();
        newItemRef.set({
          'id': this.props.recipeid,
          'name': this.state.recipe['name'],
        });
        // Save the recipe's key in firebase
        this.setState({
          recipeKey: newItemRef.key,
        });
      }
      // Notify the parent of an update to the list of favorites
      // This is used only by the "favorites" tab
      this.props.callback();
      // Toggle the state variable
      this.setState({
        favoriteRecipe: !this.state.favoriteRecipe,
      });
    }
  }

  render() {
    return (
      <div>
        <button className="tile-front" onClick={this.openRecipe}>
          <img src={this.state.recipe.image} width="130" height="130" alt="Recipe Image"/>
            <h2>{this.state.recipe.name}</h2>
            <br/><br/>
        </button>
          <RecipeWindow
            loaded={this.state.loaded}
            isOpen={this.state.recipeOpen}
            afterOpen={this.afterOpenRecipe}
            closeModal={this.closeRecipe}
            recipe={this.state.recipe}
            isFavorite={this.state.favoriteRecipe}
            toggleFavorite={this.toggleFavorite}
            loggedIn={this.state.loggedIn}
            recipeImage={this.state.recipe.image}
          />
      </div>
    );
  }
}

export default Tile;