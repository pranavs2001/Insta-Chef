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
      uid: '',
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
    // Fetch the list of valid ingredients
    const url = 'https://www.themealdb.com/api/json/v1/1/lookup.php?';
    const params = { 'i': this.props.recipeid };
    fetch(url + new URLSearchParams(params))
      .then(CheckError)
      .then(result => {
        const recipeinfo = result['meals'][0];
        this.processMeal(recipeinfo);
      })
      .catch(error => console.log(error));

      // See if this recipe is a user's favorite recipe
      if (fire.auth().currentUser) {
        let uid = fire.auth().currentUser.uid;
        // Automatically create "other" category if it doesn't exist
        let recipeRef = fire.database().ref(uid + '/favorites').orderByChild('items');
        recipeRef.on('value', (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            if (this.props.recipeid === childSnapshot.val()['id']) {
              this.setState({
                favoriteRecipe: true,
                recipeKey: childSnapshot.key,
              });
            }
            // console.log(childSnapshot.val()['id'], this.props.recipeid)
          })
        });
        this.setState({
          loggedIn: true,
          uid: uid,
        })
      }
  }

  processMeal(recipeInfo) {
    let ingredients = {}
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
      // Toggle the state variable
      this.setState({
        favoriteRecipe: !this.state.favoriteRecipe,
      });
      // If this recipe is already a favorite, remove it from firebase
      const uid = this.state.uid;
      if (this.state.favoriteRecipe) {
        // console.log("Added to favorites");
        const recipeKey = this.state.recipeKey.toString();
        // console.log(recipeKey);
        let ref = fire.database().ref(this.state.uid + '/favorites/' + recipeKey);
        ref.set({item: null})
            .catch(err => {console.log('Error: ', err);});
      } else {
        // add the recipe to Firebase
        let itemRef = fire.database().ref(uid + '/favorites');
        let newItemRef = itemRef.push();
        newItemRef.set({
          'id': this.props.recipeid,
          'name': this.state.recipe['name'],
        });
        this.setState({
          recipeKey: newItemRef,
        });
        // console.log("Removed from favorites");
      }
    }
  }

  render() {//button composed of image, the name of recipe, then link

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