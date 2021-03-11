import React from 'react';
import fire from "../SignIn/fire"
import "firebase/database"
import AddIngredModal from './AddIngredModal'
import CheckError from "../MealDB/checkerror";
import Tabs from "../../Components/Tabs/Tabs.js";
import PantryGrid from './PantryGrid';

class Pantry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {'Other': {}, "+": {}},
      categories: ['Other', "+"],
      uid: '',
      loggedIn: false,
      visible: false,
      newCategory: '',
    };

    this.requestAdd = this.requestAdd.bind(this);
    this.removeItemFromPantry = this.removeItemFromPantry.bind(this);
    this.processMealIDs = this.processMealIDs.bind(this);

    this.updateCategories = this.updateCategories.bind(this);
    this.removeCategory = this.removeCategory.bind(this);
    this.updateCategoryName = this.updateCategoryName.bind(this);
  }

  componentDidMount() {
    //if user is logged in
    if (fire.auth().currentUser) {
      // Get the user's pantry items
      let uid = fire.auth().currentUser.uid;
      let pantryRef = fire.database().ref(uid + '/pantryItems').orderByChild('items');
      pantryRef.on('value', (snapshot) => {
        let items = {};
        snapshot.forEach((childSnapshot) => {
          items[childSnapshot.key] = childSnapshot.val()
        });
        this.sortIngredients(items);
      });
      // Register that the user has logged in
      this.setState({
        loggedIn: true,
      })
    }
  }

  /**
   * requestAdd: Handle a request to add an item to the pantry by fetching matching recipes
   * @param {string} ingredient to be added to pantry
   * @param {string} category to which this ingredient belongs
   */
  requestAdd(ingredient, category) {
    // Fetch the list of valid ingredients
    const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?';
    const params = { 'i': ingredient };
    fetch(url + new URLSearchParams(params))
      .then(CheckError)
      .then(result => {
        const recipeList = result['meals'];
        this.addItemToPantry(ingredient, category, this.processMealIDs(recipeList))
      })
      .catch(error => console.log(error));
  }

  /**
   * addItemToPantry: add an item to the user's pantry, if the item is already present alert the user
   * @param {string} ingredient to be added to the user's pantry
   * @param {string} category to which this ingredient belongs
   * @param {[string]} recipeIDs of recipes in which this ingredient is used
   */
  addItemToPantry(ingredient, category, recipeIDs) {
    if (this.state.loggedIn) {
      const uid = fire.auth().currentUser.uid;
      let itemRef = fire.database().ref(uid + '/pantryItems');
      let itemsInFire = itemRef.orderByChild('items');
      let itemAlreadyInPantry = false;
      itemsInFire.on('value', (snapshot) => {
        // loop through firebase
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.val().item.toString() === ingredient) {
              itemAlreadyInPantry = true;
          }
        })
      });
      if (itemAlreadyInPantry) {
        alert(`${ingredient} is already in your pantry`);
        return;
      }
      const newItem = {
        item: ingredient,
        category: category,
        recipeIDs: recipeIDs,
      };

      // add the item to Firebase
      let newItemRef = itemRef.push();
      newItemRef.set(newItem);
      this.sortIngredients({newItem});
    }
  }

  /**
   * Add
   * @param category {string} can be empty string to simply organize categories
   */
  updateCategories(category) {
    let categories = this.state.categories;
    // Remove the default "Other" and "+" tabs
    let index = categories.indexOf('Other');
    if (index !== -1) {
      categories.splice(index, 1);
    }
    index = categories.indexOf('+');
    if (index !== -1) {
      categories.splice(index, 1);
    }
    // Add the category to the list of categories and items, if necessary
    let items = this.state.items;
    if (categories.indexOf(category) === -1 && category !== '') {
      categories.push(category);
      items[category] = {};
    }
    // Sort the categories and add back in the "Other" and "+" categories
    // Note: The "+" tab is a category to make the tabs generate properly
    categories.sort();
    categories.push("Other");
    categories.push("+");
    this.setState({
      categories: categories,
      items: items,
    })
  }


  removeCategory(category) {
    // Do not delete the "Other" category
    if (category !== "Other") {
      let uid = fire.auth().currentUser.uid;
      let items = this.state.items;
      // Reassign every item to the "Other" category (both locally and in Firebase)
      for (const itemKey in items[category]) {
        if (itemKey !== 'newItem') {
          const itemRef = fire.database().ref(uid + '/pantryItems/' + itemKey);
          itemRef.update({category: "Other"});
          items["Other"][itemKey] = items[category][itemKey];
        }
      }
      // Delete the category from the local list
      items[category] = undefined;
      let categories = this.state.categories;
      let index = categories.indexOf(category);
      if (index !== -1) {
        categories.splice(index, 1);
      }
      this.setState({
        items: items,
        categories: categories,
      })
      //before removing category, move (can you simply modify the associated category to Other) all ingredients in current category over to the Other category
    } else {
      alert(`Can't remove ${category.toString()} category.`)
    }
  }

  /**
   * removeItemFromPantry: remove an item from a user's pantry
   * @param key {string} the firebase key for this item
   * @param category {string} the category for this item
   */
  removeItemFromPantry(key, category) {
    if(this.state.loggedIn) {
      // remove from firebase
      const uid = fire.auth().currentUser.uid;
      let ref = fire.database().ref(uid + '/pantryItems/' + key.toString());
      ref.set({item: null})
          .catch(err => {console.log('Error: ', err);});
      // remove locally
      const items = this.state.items;
      delete items[category][key];
      this.setState({
        items: items,
      });
      //TODO: Delete category if this item was the only one
    } else {
      alert(`Can't remove ${key} you need to login first`)
    }
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

  /**
   * sortIngredients: sort the ingredients into their corresponding categories and save to the state
   * @param items {{}} - a dictionary of items
   * Each item is a dictionary with a key, name, and corresponding recipe IDs
   */
  sortIngredients(items){
    let currentItems = this.state.items;
    let categories = this.state.categories;
    // Add each item
    for (const key in items) {
      // Sometimes an item named 'newItem' appears
      if (key !== 'newItem') {
        const category = items[key]['category'];
        // Add local category if it doesn't already exist
        if (currentItems[category] === undefined) {
          currentItems[category] = {};
        }
        // Add to list of items
        currentItems[category][key] = {
          name: items[key]['item'],
          recipeIDs: items[key]['recipeIDs'],
        };
        // Add to list of categories if not already present
        if (categories.indexOf(category) === -1) {
          categories.push(category);
        }
      }
    }
    // Update the state
    this.setState({
      items: currentItems,
      categories: categories,
    });
    // Order the categories
    this.updateCategories('');
  }

  // Used to adding a new user-defined category
  updateCategoryName(value) {
    this.setState({newCategory: value,});
  }

  render() {
    const categories = this.state.categories;
    return (
      <div style={{ backgroundColor: "rgb(202, 230, 240)", height: "100vh" }} >
        <AddIngredModal
          requestAdd={this.requestAdd}
          loggedIn={this.state.loggedIn}
          categories={this.state.categories}
        />
        <Tabs removeCategory={this.removeCategory}>
          {Object.keys(this.state.categories).map((key, index) => {
            if (categories[key] === "+") {
              return (
                <div label="+">
                  <div className="tab-box">
                    <input
                    // style={BarStyling}
                    key="categoryModal"
                    value={this.state.newCategory}
                    placeholder={"Add category"}
                    onChange={(e) => this.updateCategoryName(e.target.value)}
                    />
                    <button onClick={()=>{
                      this.updateCategories(this.state.newCategory);
                      this.setState({newCategory: ''});
                    }}>
                        Add
                    </button>
                  </div>
                </div>
              )
            } else {
              return (
                <div label={categories[key]}>
                  <div className="tab-box">
                    <PantryGrid
                      ingredients={this.state.items[categories[key]]}
                      category={categories[key]}
                      removeItemFromPantry={this.removeItemFromPantry}
                    />
                  </div>
                </div>
              )
            }
          })}
        </Tabs>
      </div>
    );
  }
}

export default Pantry;