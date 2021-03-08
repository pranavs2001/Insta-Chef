import React from 'react';
import fire from "../SignIn/fire"
import RecipeGrid from '../Tile/RecipeGrid'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      keyword: '',
      recipes: {},
      validRecipes: [],
    };
    this.timeout =  0;
    // recipes is the total list of recipes as fetched on loading
    // recipes is a dictionary mapping a recipe id to a recipe name
    // validrecipes is a list of recipes that match the keyword
    this.callback = this.callback.bind(this)
  }

  doSearch(evt){
    var modSearchText = evt.target.value + "  "; // this is the search text
    var searchText = evt.target.value;
    if(this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.updateSearch(modSearchText);
      this.updateSearch(searchText);
    }, 1);
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
      while (randomRecipes < 10 && randomRecipeIDs.length < recipes.length) {
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
      this.getRandomRecipes()
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
    const BarStyling = {width:"20rem", height: "2rem", background:"#F2F1F9", border:"bold", padding:"0.5rem"};
    return (
      <div>
        <input
         style={BarStyling}
         key="recipeSearch"
         value={keyword}
         placeholder={"Search for a recipe"}
         onChange={(e) => this.doSearch(e)}
        />
        <RecipeGrid recipes={this.state.validRecipes} callback={this.callback}/>
      </div>
    );
  }
}

export default Search;