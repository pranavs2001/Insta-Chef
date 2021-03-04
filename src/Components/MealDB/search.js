import React from 'react';
import data from '../../support/recipelist.json'
import Tile from '../Tile/tile'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      keyword: '',
      recipes: data,
      validRecipes: {},
      // TODO: Get firebase credentials
    }
    this.timeout =  0;
    // recipes is the total list of recipes as fetched on loading
    // recipes is a dictionary mapping a recipe id to a recipe name
    // validrecipes is a list of recipes that match the keyword
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
    // TODO: Fetch the list of recipes from firebase
  }

  updateSearch(value) {
    console.log('value is: ', value);
    const searchStr = value;
    let matches = [];
    // Make sure ingredient list is not empty
    if (searchStr != '') {
      const recipeList = this.state.recipes;
      for (const recipeid in recipeList) {
        const name = recipeList[recipeid]
        // if (name.toLocaleLowerCase().startsWith(searchStr.toLowerCase())) {
        //   matches.push({'id': recipeid, 'name': name});
        // }
        // console.log('name is: ', name);
        if (name.toLocaleLowerCase().includes(searchStr.toLowerCase())) {
          console.log('name in includes if is: ', name);
          matches.push({ 'id': recipeid, 'name': name });
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
    console.log('matching recipies is: ', matchingrecipes);
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
        {/* <ListRecipes recipes={matchingrecipes}/> */}
        <ListTiles recipes={matchingrecipes}/>
        {/* <ListRecipes recipes={matchingrecipes}/> */}
      </div>
    );
  }
}

// List all matching recipes
// function ListRecipes(props) {
//   return (
//     Object.keys(props.recipes).map((id, index) =>
//       <li key={props.recipes[index]['id']}>{props.recipes[index]['name']}</li>
//     )
//   );
// }

function ListTiles(props) {
  console.log('props.recipies in listTiles is: ', props.recipes);
  return (
    Object.keys(props.recipes).map((id, index) => 
      <div>
        <p>{id}</p>
        <Tile recipeid={props.recipes[index]['id']}/>
      </div>
    )
  );
}

export default Search;