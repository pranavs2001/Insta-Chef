import React from 'react';
import data from '../../support/recipelist.json'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      keyword: '',
      recipes: data,
      validRecipes: {},
    }
    // recipes is the total list of recipes as fetched on loading
    // recipes is a dictionary mapping a recipe id to a recipe name
    // validrecipes is a list of recipes that match the keyword
  }

  componentDidMount() {
    // TODO: Fetch the list of recipes from firebase
  }

  updateSearch(value) {
    const searchStr = value;
    let matches = [];
    // Make sure ingredient list is not empty
    if (searchStr != '') {
      const recipeList = this.state.recipes;
      for (const recipeid in recipeList) {
        const name = recipeList[recipeid]
        if (name.toLocaleLowerCase().startsWith(searchStr.toLowerCase())) {
          matches.push({'id': recipeid, 'name': name});
        }
      }
    }
    this.setState({
      keyword: value,
      validRecipes: matches,
    });
  }

 render() {
    // get state variables
    const keyword = this.state.keyword;
    const matchingrecipes = this.state.validRecipes;
    // parameters for search bar
    const BarStyling = {width:"20rem", height: "2rem", background:"#F2F1F9", border:"bold", padding:"0.5rem"};
    return (
      <div>
        <input
         style={BarStyling}
         key="recipeSearch"
         value={keyword}
         placeholder={"Search for a recipe"}
         onChange={(e) => this.updateSearch(e.target.value)}
        />
        <ListRecipes recipes={matchingrecipes}/>
      </div>
    );
  }
}

// List all matching recipes
function ListRecipes(props) {
  return (
    Object.keys(props.recipes).map((id, index) =>
      <li key={props.recipes[index]['id']}>{props.recipes[index]['name']}</li>
    )
  );
}

export default Search;