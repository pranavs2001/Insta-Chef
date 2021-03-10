import React from 'react';
import fire from "../SignIn/fire"
import "firebase/database"
import AddIngredModal from './AddIngredModal'
import CheckError from "../MealDB/checkerror";
import Tabs from "../../Components/Tabs/Tabs.js";
import PantryGrid from './PantryGrid'

class Pantry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      categories: ['Other'],
      uid: '',
      loggedIn: false,
    };
    this.requestAdd = this.requestAdd.bind(this);
    this.removeItemFromPantry = this.removeItemFromPantry.bind(this);
    this.processMealIDs = this.processMealIDs.bind(this);
  }

  componentDidMount() {
    //if user is logged in
    if (fire.auth().currentUser) {
      let uid = fire.auth().currentUser.uid;
      // Get ingredient categories
      let categoryRef = fire.database().ref(uid + '/categories');
      // console.log(categoryRef);
      categoryRef.on('value', (snapshot) => {
        let categories = [];
        snapshot.forEach((childSnapshot) => {
          categories.push(childSnapshot.val());
          // console.log(childSnapshot);
        });
        // Reformat category list to put "Other" at the end
        const index = categories.indexOf('Other');
        if (index !== -1) {
          categories.splice(index, 1);
        }
        // Automatically create "other" category if it doesn't exist
        categories.push("Other");
        // categories.push("Dairy");
        const items = {};
        for (const category of categories) {
          items[category] = {};
        }
        this.setState({
          categories: categories,
          items: items,
          uid: uid,
          loggedIn: true,
        });
      });
      //get latest pantry items
      let pantryRef = fire.database().ref(uid + '/pantryItems').orderByChild('items');
      pantryRef.on('value', (snapshot) => {
        let items = {};
        snapshot.forEach((childSnapshot) => {
          items[childSnapshot.key] = childSnapshot.val()
        });
        // console.log(items);
        this.sortIngredients(items);
      });
    }
  }

  /**
   * addItemToPantry: add an item to the user's pantry, if the item is already present alert the user
   * @param {string} ingredient to be added to the user's pantry
   * @param {string} category to which this ingredient belongs
   * @param {[string]} recipeIDs of recipes in which this ingredient is used
   */
  addItemToPantry(ingredient, category, recipeIDs) {
    // console.log('ingredient in addItemToPantry is: ', ingredient);
    if (this.state.loggedIn) {
      let itemRef = fire.database().ref(this.state.uid + '/pantryItems');
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
      newItemRef.set({
        item: ingredient,
        category: category,
        recipeIDs: recipeIDs,
      });

      // See if category needs to be added to pantry
      this.updateCategories(category);
      // console.log('items are: ', items);
      this.sortIngredients({newItem});


    }
  }

  updateCategories(category) {
    // Search database to see if category exists
    // let categoryRef = fire.database().ref(this.state.uid + '/categories/');
    // let categoriesInFire = categoryRef.orderByChild('items');
    let currentCategories = this.state.categories;
    let categoryPresent = false;
    Object.keys(currentCategories).map((key, index) => {
      if (currentCategories[key] === category) {
        categoryPresent = true;
      }
    });
    // Do nothing if category is already present
    // console.log("Category already present: ", categoryPresent);
    if (categoryPresent !== true) {
      // Add category to firebase
      let categoryRef = fire.database().ref(this.state.uid + '/categories/');
      let newItemRef = categoryRef.push();
      newItemRef.set(category);

      // Update local list of categories
      let categories = this.state.categories;
      categories.push(category);
      let items = this.state.items;
      items[category] = {};
      this.setState({
        categories: categories,
        items: items,
      })
    }
  }


  removeItemFromPantry(key, category) {
    // console.log("Removing ", key);
    if(this.state.loggedIn) {
        const uid = fire.auth().currentUser.uid;
        let ref = fire.database().ref(uid + '/pantryItems/' + key.toString());
        ref.set({item: null})
            // .then( () => {console.log(`${key} removed from pantry`);})
            .catch(err => {console.log('Error: ', err);});
        const items = this.state.items;
        delete items[category][key];
        this.setState({
          items: items,
        });
    } else {
      alert(`Can't remove ${key} you need to login first`)
    }
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
    const params = {'i': ingredient};
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

  sortIngredients(items){
    // const categories = this.state.categories;
    let currentItems = this.state.items;
    for (const key in items) {
      const category = items[key]['category'];
      // console.log(currentItems, currentItems[category][key], index);
      // For some reason, there is always an extra entry named 'newitem'
      if (key !== 'newItem' && currentItems[category][key] === undefined) {
        currentItems[category][key] = {
          name: items[key]['item'],
          recipeIDs: items[key]['recipeIDs'],
        };
      }
    };
    // console.log(currentItems);
    this.setState({
      items: currentItems,
    });
  }

  render() {
    return (
      <div style={{ backgroundColor: "rgb(202, 230, 240)", height: "100vh" }} >
        <AddIngredModal
          requestAdd={this.requestAdd}
          loggedIn={this.state.loggedIn}
          categories={this.state.categories}
        />
        <Tabs>
          {Object.keys(this.state.categories).map((key, index) => {
            return (
              <div label={this.state.categories[key]}>
                <div className="tab-box">
                  <PantryGrid
                    ingredients={this.state.items[this.state.categories[key]]}
                    category={this.state.categories[key]}
                    removeItemFromPantry={this.removeItemFromPantry}
                  />
                </div>
              </div>
            )
          })}
        </Tabs>
      </div>
    );
  }
}

export default Pantry;