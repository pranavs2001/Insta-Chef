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
    //modal functions
    // this.handleExit = this.handleExit.bind(this);
    // this.handleOpen = this.handleOpen.bind(this);
    this.updateCategories = this.updateCategories.bind(this);
    this.removeCategory = this.removeCategory.bind(this);
    this.updateCategoryName = this.updateCategoryName.bind(this);
  }

  componentDidMount() {
    //if user is logged in
    if (fire.auth().currentUser) {
      let uid = fire.auth().currentUser.uid;
      let pantryRef = fire.database().ref(uid + '/pantryItems').orderByChild('items');
      pantryRef.on('value', (snapshot) => {
        let items = {};
        snapshot.forEach((childSnapshot) => {
          items[childSnapshot.key] = childSnapshot.val()
        });
        // console.log(items);
        this.sortIngredients(items);
      });
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
    // console.log("Adding " + ingredient.toString() + " to pantry in category " + category.toString());
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
    // console.log('ingredient in addItemToPantry is: ', ingredient);
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
      // console.log('items are: ', items);
      this.sortIngredients({newItem});
    }
  }

  /**
   * Add
   * @param category {string} can be empty string to simply organize categories
   */
  updateCategories(category) {
    let categories = this.state.categories;
    let index = categories.indexOf('Other');
    if (index !== -1) {
      categories.splice(index, 1);
    }
    index = categories.indexOf('+');
    if (index !== -1) {
      categories.splice(index, 1);
    }
    let items = this.state.items;
    if (categories.indexOf(category) === -1 && category !== '') {
      console.log("Adding category: " + category.toString());
      categories.push(category);
      items[category] = {};
    }
    categories.sort();
    categories.push("Other");
    categories.push("+");
    this.setState({
      categories: categories,
      items: items,
    })
  }

  // TODO: Switch tabs when removing category
  removeCategory(category) { //key is categoryKey
    if (category !== "Other") { //check that we are not deleting 'Other' category
      let uid = fire.auth().currentUser.uid;
      // let pantryRef = fire.database().ref(uid + '/pantryItems').orderByChild('items');
      let items = this.state.items;
      for (const itemKey in items[category]) {
        if (itemKey !== 'newItem') {
          const itemRef = fire.database().ref(uid + '/pantryItems/' + itemKey);
          itemRef.update({category: "Other"});
          items["Other"][itemKey] = items[category][itemKey];
        }
      }
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

  sortIngredients(items){
    // const categories = this.state.categories;
    // console.log(items, this.state.items, this.state.categories);
    let currentItems = this.state.items;
    let categories = this.state.categories;
    for (const key in items) {
      // console.log(categories);
      if (key !== 'newItem') {
        const category = items[key]['category'];
        // console.log(items, currentItems, currentItems[category][key]);
        // Create sub-dictionary if not already defined
        if (currentItems[category] === undefined) {
          currentItems[category] = {};
        }
        currentItems[category][key] = {
          name: items[key]['item'],
          recipeIDs: items[key]['recipeIDs'],
        };
        // Add to list of categories if not already present
        if (categories.indexOf(category) === -1) {
          categories.push(category);
          // console.log("Adding category", category)
        }
      }
    }
    // console.log(currentItems);
    this.setState({
      items: currentItems,
      categories: categories,
    });
    // console.log(categories);
    this.updateCategories('');
  }

  updateCategoryName(value) {
    this.setState({
      newCategory: value,
    });
  }

  render() {
    // console.log(this.state.categories, this.state.items);
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
                <div label="+" onClick={() => this.handleOpen()}>
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