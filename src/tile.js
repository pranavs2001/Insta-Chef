import React from 'react';
import './tile.css';
import RecipeWindow from './Components/MealDB/recipewindow.js'

function CheckError(response) {
  if (response.status >= 200 && response.status <= 299) {
    return response.json();
  } else {
    throw Error(response.statusText);
  }
}

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
    const params = {'i': this.props.recipeid};
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
      loaded:true,
      recipe: data,
    });
  }


  flipTile() {
    this.setState({
      flipped: !this.state.flipped,
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

  closeRecipe() {
    this.setState({
      recipeOpen: false,
    });
  }

  ingredList(ingred, meas) {
    var listItems = ""

    for(let i = 0; i < ingred.length; i++) {
      listItems = listItems + " " + ingred[i] + " " + "(" + meas[i] + ")" + ","
    }

    return listItems
  }

  render() {//button composed of image, the name of recipe, then link
    const flip = this.state.flipped;

    return (
      <div>
        <button className="tile-back" onClick={this.openRecipe}>
        View Detailed Info
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
    // if(flip) {
    //   <button class="tile-back" onClick={this.flipTile}>
    //     <h5>Ingredients:</h5>
    //     <br/>
    //     <p>{this.ingredList(this.props.ingred, this.props.meas)}</p>
    //     <br/>
    //     <p>{this.props.instr}</p>
    //   </button>
    // } else {
      // <button class="tile-front" onClick={this.flipTile}>
      //   <img src={this.props.image} width="100" height="100"/>
      //   <br/>
      //   <h3>{this.props.title}</h3>
      //   <br/>
      //   <input type="button" target="_blank" rel="noopener noreferrer" onclick={this.props.link} value="Video" />
      // </button>
  }
}

export default Tile;