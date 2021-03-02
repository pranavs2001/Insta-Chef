import React from 'react';
import styles from './tile.css';
import RecipeWindow from './Components/MealDB/recipewindow.js';
import CheckError from "./Components/MealDB/checkerror";

class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flipped: false,
      recipe: {},
      loaded: false,
      recipeOpen: false,
    };
    this.openRecipe = this.openRecipe.bind(this);
    this.afterOpenRecipe = this.afterOpenRecipe.bind(this);
    this.closeRecipe = this.closeRecipe.bind(this);
    this.processMeal = this.processMeal.bind(this);
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

  render() {//button composed of image, the name of recipe, then link

    return (
      <div>
        <button className="styles.tile_back" onClick={this.openRecipe}>
          <img src={this.state.recipe.image} width="130" height="130" alt="Recipe Image"></img>
            <h2>{this.state.recipe.name}</h2>
            <br/><br/>
        </button>
          <RecipeWindow
            loaded={this.state.loaded}
            isOpen={this.state.recipeOpen}
            afterOpen={this.afterOpenRecipe}
            closeModal={this.closeRecipe}
            recipe={this.state.recipe}
          />
      </div>


    );
        }
}

export default Tile;