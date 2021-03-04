import React from 'react';
import fire from "../SignIn/fire"
import "firebase/database"
import AddIngredModal from './AddIngredModal'
import CheckError from "../MealDB/checkerror";

class Pantry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      categories: ['Other'],
      uid: '',
      loggedIn: false,
    };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.viewPantry = this.viewPantry.bind(this);
    this.requestAdd = this.requestAdd.bind(this);
    this.processMealIDs = this.processMealIDs.bind(this);
    // this.addItemForm = this.addItemForm.bind(this);
  }

  componentDidMount() {
    //get latest pantry items
    //if user is logged in
    if (fire.auth().currentUser) {
      let uid = fire.auth().currentUser.uid;
      let items = [];
      let categories = [];
      // Automatically create "other" category if it doesn't exist
      let pantryRef = fire.database().ref(uid + '/pantryItems/').orderByChild('items');
      pantryRef.on('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          items.push(childSnapshot.val());
        })
      });
      // Get ingredient categories
      let categoryRef = fire.database().ref(this.state.uid + '/categories/').orderByChild('items');
      categoryRef.on('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          categories.push(childSnapshot.val());
        })
      });
      // Reformat category list to put "Other" at the end
      const index = categories.indexOf('Other');
      if (index !== -1) {
        categories.splice(index,1);
      }
      categories.push("Other");
      // console.log(items);
      this.setState({
        items: items,
        categories: categories,
        uid: uid,
        loggedIn: true,
      });
    }
  }

  /**
   * addItemToPantry: add an item to the user's pantry, if the item is already present alert the user
   * @param {string} ingredient to be added to the user's pantry
   * @param {string} category to which this ingredient belongs
   * @param {string} recipeIDs of recipes in which this ingredient is used
   */
  addItemToPantry(ingredient, category, recipeIDs) {
    if (this.state.loggedIn) {
      let itemRef = fire.database().ref(this.state.uid + '/pantryItems/');
      let items = itemRef.orderByChild('items');
      let itemAlreadyInPantry = false;
      items.on('value', (snapshot) => {
        let ingredients = [];
        snapshot.forEach((childSnapshot) => {
          let val = childSnapshot.val();
          ingredients.push(val);
        });
        ingredients.forEach(elem => {
          if (elem.item.toString().localeCompare(ingredient) === 0) {
            itemAlreadyInPantry = true;
          }
        });
      });
      if (itemAlreadyInPantry) {
        alert(`${ingredient} is already in your pantry`);
        return;
      }
      console.log('An item was submitted: ' + ingredient);
      let newItemRef = itemRef.push();
      newItemRef.set({
        item: ingredient,
        category: category,
        recipeIDs: recipeIDs,
      });

      //TODO: Fix the fact that every item is present twice at this point in time

      // // Update the local ingredient list
      // let newItemList = this.state.items;
      // console.log("Before Addition:");
      // console.log(newItemList);
      // newItemList.push({
      //   item: ingredient,
      //   category: category,
      //   recipeIDs: recipeIDs,
      // });
      // console.log("After Addition:");
      // console.log(newItemList);
      // this.setState({
      //   items: newItemList,
      // });

      // See if category needs to be added to pantry
      this.updateCategories(category);
    }
  }

  updateCategories(category) {
    // Search database to see if category exists
    let categoryRef = fire.database().ref(this.state.uid + '/categories/');
    let categoryPresent = false;
    console.log(categoryRef);
    categoryRef.on('value', (snapshot) => {
      let vals = [];
      snapshot.forEach((childSnapshot) => {
        vals.push(childSnapshot.val());
      });
      vals.forEach(elem => {
        if (elem.toString() === category) {
          categoryPresent = true;
        }
      });
    });
    // Do nothing if category is already present
    if (categoryPresent) {
      return;
    }
    // Add category to firebase
    let newItemRef = categoryRef.push();
    newItemRef.set(category);

    // Update local list of categories
    let categories = this.state.categories;
    categories.push(category);
    this.setState({
      categories: categories,
    })
  }

  /**
   * requestAdd: Handle a request to add an item to the pantry by fetching matching recipes
   * @param {string} ingredient to be added to pantry
   * @param {string} category to which this ingredient belongs
   */
  requestAdd(ingredient, category) {
    // Fetch the list of valid ingredients
    // console.log("Adding " + ingredient.toString() + " to pantry in category " + category.toString());
    const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?'
    const params = {'i': ingredient}
    fetch(url + new URLSearchParams(params))
      .then(CheckError)
      .then(result => {
        const recipeList = result['meals'];
        this.addItemToPantry(ingredient, category, this.processMealIDs(recipeList))
      })
      .catch(error => console.log(error));
  }

  /**
   * processMealIDs: extract recipe IDs from get request
   * @param recipeList results from the fetch
   * @returns {[ids]} list of ids of matching recipes
   */
  processMealIDs(recipeList) {
    let ids = [];
    for (const index in recipeList) {
      ids.push(recipeList[index]['idMeal'])
    }
    return (ids);
  }

  viewPantry() {
    if (this.state.loggedIn) {
      let items = this.state.items;
      // console.log(items);
      return items.map((elem, index) => {
        return <li key={index}>{elem.item}</li>
      })
    } else {
      return (
        <div>
          <h3>You need to login before viewing your pantry</h3>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="test">
        <div className="pantry" style={{display: "flex", justifyContent: "center"}}>
          <div className="pantryItems" style={{diplay: "inlineBlock", textAlign: "left"}}>
            <this.viewPantry/>
          </div>
        </div>
        <AddIngredModal
          requestAdd={this.requestAdd}
          loggedIn={this.state.loggedIn}
          categories={this.state.categories}
        />
      </div>
    );
  }

}

export default Pantry;