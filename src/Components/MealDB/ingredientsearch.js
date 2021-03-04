import React from 'react'
import CheckError from "./checkerror";
import IngredientListItem from "./IngredientListItem";

function ShowIngredients (props) {
  if (props.loaded === false) {
    return (
      <p>Loading ingredients...</p>
    )
  } else if (Object.keys(props.ingredients).length === 0) {
    return (
      <p>No matching ingredients</p>
    )
  } else {
    return (
      <table>
        <tbody>
          {props.ingredients.map((ingredient) =>
            <tr key={ingredient['id']}>
              <IngredientListItem
                item={ingredient}
                requestAdd={props.requestAdd}
                categories={props.categories}
              />
            </tr>
          )}
        </tbody>
      </table>
    )
  }
}

class IngredientSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      baseIngredients: {},
      validIngredients: {},
      keyword: '',
      loaded: false,
    }
  }

  componentDidMount() {
    // Fetch the list of valid ingredients
    const url = 'https://www.themealdb.com/api/json/v1/1/list.php?'
    const params = {'i': 'list'}
    fetch(url + new URLSearchParams(params))
      .then(CheckError)
      .then(result => {
        const ingredientList = result['meals'];
        this.processIngredients(ingredientList);
      })
      .catch(error => console.log(error));
  }

  processIngredients(ingredientList) {
    // Process the list of ingredients
    let ingredients = {};
    for (const item in ingredientList) {
      const ingredientData = ingredientList[item]
      const data = {
        'id': ingredientData['idIngredient'],
        // 'description': ingredientData['strDescription'],
      }
      ingredients[ingredientData['strIngredient']] = data
    }
    // Set the state
    this.setState({
      baseIngredients: ingredients,
      loaded: true,
    });

  }

  updateSearch(value) {
    // console.log(value);
    const searchStr = value;
    let matches = [];
    // Make sure ingredient list is not empty
    if (searchStr != '') {
      const ingredientList = this.state.baseIngredients;
      for (const ingredient in ingredientList) {
        if (ingredient.toLocaleLowerCase().startsWith(searchStr.toLowerCase())) {
          matches.push({'name': ingredient, 'id': ingredientList[ingredient]['id']});
        }
      }
    }
    this.setState({
      keyword: value,
      validIngredients: matches,
    });
  }

  render() {
    // get state variables
    const keyword = this.state.keyword;
    const validIngredients = this.state.validIngredients;
    // parameters for search bar
    const BarStyling = {width:"20rem", height: "2rem", background:"#F2F1F9", border:"bold", padding:"0.5rem"};
    return (
      <div>
        <input
         style={BarStyling}
         key="ingredientSearch"
         value={keyword}
         placeholder={"Search for an ingredient"}
         onChange={(e) => this.updateSearch(e.target.value)}
        />
        <ShowIngredients
          ingredients={validIngredients}
          loaded={this.state.loaded}
          requestAdd={this.props.requestAdd}
          categories={this.props.categories}
        />
      </div>
    );
  }
}

export default IngredientSearch;