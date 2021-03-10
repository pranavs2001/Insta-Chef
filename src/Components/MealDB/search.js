import React from 'react';
import fire from "../SignIn/fire"
import RecipeGrid from '../Tile/RecipeGrid'
import './search.css'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      keyword: '',
      recipes: {},
      validRecipes: [],
    };
    // recipes is the total list of recipes as fetched on loading
    // recipes is a dictionary mapping a recipe id to a recipe name
    // validrecipes is a list of recipes that match the keyword
    this.callback = this.callback.bind(this)
  }

  componentDidMount() {
    let pantryRef = fire.database().ref('recipes').orderByChild('items');
    pantryRef.on('value', (snapshot) => {
      let recipes = {};
      snapshot.forEach((childSnapshot) => {
        recipes[childSnapshot.key] = childSnapshot.val()
      });
      this.setState({
        recipes: recipes,
      });
    });
    this.getRandomRecipes()
  }

  getRandomRecipes () {
    const uid = fire.auth().currentUser.uid;
    let ingredientRef = fire.database().ref(uid + '/pantryItems').orderByChild('items');
    ingredientRef.on('value', (snapshot) => {
      let recipes = [];
      snapshot.forEach((childSnapshot) => {
        const recipeIDs = childSnapshot.val()['recipeIDs'];
        // console.log()
        if (recipeIDs !== undefined) {
          recipeIDs.map((id) => {
            recipes.push({
              'id': id,
              'name': '',
            })
        });

        }
      });

      // Select 10 random recipes to display
      let randomRecipes = 0;
      let randomRecipeIDs = [];
      while (randomRecipes < 12 && randomRecipeIDs.length < recipes.length) {
        randomRecipeIDs.push(recipes.pop(Math.floor(Math.random() * recipes.length)));
        randomRecipes += 1;
      }
      this.setState({
        validRecipes: randomRecipeIDs,
      });
    });
  }

  updateSearch(value) {
    // console.log('value is: ', value);
    const searchStr = value;
    // Make sure ingredient list is not empty
    if (searchStr !== '') {
      let matches = [];
      const recipeList = this.state.recipes;
      for (const recipeid in recipeList) {
        const name = recipeList[recipeid];
        // if (name.toLocaleLowerCase().startsWith(searchStr.toLowerCase())) {
        //   matches.push({'id': recipeid, 'name': name});
        // }
        // console.log('name is: ', name);
        if (name.toLocaleLowerCase().includes(searchStr.toLowerCase())) {
          // console.log('name in includes if is: ', name);
          matches.push({ 'id': recipeid, 'name': name });
        }
      }
      this.setState({
        keyword: value,
        validRecipes: matches,
      });
    } else {
      this.setState({keyword: ''});
      this.getRandomRecipes();
    }
  }

  // Dummy function for tiles to notify parents of change
  callback() {
  }

 render() {
    // get state variables
    const keyword = this.state.keyword;
    // console.log('matching recipies is: ', matchingrecipes);
    // parameters for search bar
    return (
      <div style={{ backgroundColor: "rgb(202, 230, 240)", height: "100vh"}}>
        <FontAwesomeIcon icon={faSearch} style={{paddingRight: "5px"}} size= "lg"/>
        <input
         key="recipeSearch"
         value={keyword}
         placeholder={"Search for a recipe"}
         onChange={(e) => this.updateSearch(e.target.value)}
        />
        <RecipeGrid recipes={this.state.validRecipes} callback={this.callback}/>
      </div>
    );
  }
}

export default Search;