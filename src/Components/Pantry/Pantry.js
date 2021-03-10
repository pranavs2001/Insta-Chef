import React from 'react';
import fire from "../SignIn/fire"
import "firebase/database"
import AddIngredModal from './AddIngredModal'
import CheckError from "../MealDB/checkerror";
import Tabs from "../../Components/Tabs/Tabs.js";
import PantryGrid from './PantryGrid';
import Modal from 'react-modal';
import CategoryModal from './CategoryModal';

class Pantry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      categories: ['Other'],
      uid: '',
      loggedIn: false,
      visible: false
    };
    this.viewPantry = this.viewPantry.bind(this);
    this.requestAdd = this.requestAdd.bind(this);
    this.processMealIDs = this.processMealIDs.bind(this);
    //modal functions
    this.handleExit = this.handleExit.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.updateCategories = this.updateCategories.bind(this);
    this.removeCategory = this.removeCategory.bind(this);
  }

  componentDidMount() {
    //get latest pantry items
    //if user is logged in
    if (fire.auth().currentUser) {
      let uid = fire.auth().currentUser.uid;
      // Automatically create "other" category if it doesn't exist
      let pantryRef = fire.database().ref(uid + '/pantryItems').orderByChild('items');
      pantryRef.on('value', (snapshot) => {
        let items = {};
        snapshot.forEach((childSnapshot) => {
          items[childSnapshot.key] = childSnapshot.val()
        });
        this.setState({
          items: items,
        })
      });
      // Get ingredient categories
      let categoryRef = fire.database().ref(this.state.uid + '/categories').orderByValue();
      // console.log(categoryRef);
      categoryRef.on('value', (snapshot) => {
        let categories = [];
        snapshot.forEach((childSnapshot) => {
          categories.push(childSnapshot.val());
          // console.log(childSnapshot);
        });
        // console.log(categories);
        // Reformat category list to put "Other" at the end
        const index = categories.indexOf('Other');
        if (index !== -1) {
          categories.splice(index, 1);
        }
        categories.push("Other");
        this.setState({
          categories: categories,
          uid: uid,
          loggedIn: true,
        });
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
    // console.log('ingredient in addItemToPantry is: ', ingredient);
    if (this.state.loggedIn) {
      let itemRef = fire.database().ref(this.state.uid + '/pantryItems');
      let itemsInFire = itemRef.orderByChild('items');
      let itemAlreadyInPantry = false;
      itemsInFire.on('value', (snapshot) => {
        // loop through firebase
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.val().item.toString().localeCompare(ingredient) === 0) {
            itemAlreadyInPantry = true;
          }
        })
      });
      if (itemAlreadyInPantry) {
        alert(`${ingredient} is already in your pantry`);
        return;
      }
      // add the item to Firebase
      let newItemRef = itemRef.push();
      newItemRef.set({
        item: ingredient,
        category: category,
        recipeIDs: recipeIDs,
      });

      // add the item to Pantry's state
      let key = newItemRef.key;
      let items = this.state.items;
      items[key] = {
        item: ingredient,
        category: category,
        recipeIDs: recipeIDs,
      };
      // console.log('items are: ', items);
      this.setState({
        items: items,
      });

      // See if category needs to be added to pantry
      this.updateCategories(category);
    }
  }

  updateCategories(category) {
    // Search database to see if category exists
    let categoryRef = fire.database().ref(this.state.uid + '/categories/');
    let categoriesInFire = categoryRef.orderByChild('items');
    let categoryPresent = false;
    categoriesInFire.on('value', (snapshot) => {
      let vals = [];
      snapshot.forEach((childSnapshot) => {
        vals.push(childSnapshot.val());
      });
      vals.forEach(elem => {
        if (elem.toString() === category) {
          categoryPresent = true;
          // console.log("Category already present")
        }
      });
    });
    // Do nothing if category is already present
    if (!categoryPresent) {
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
  }

  removeCategory(key) { //key is categoryKey
    let categoryRef = fire.database().ref(this.state.uid + '/categories/' + key.toString()); // retrieve category name
    //console.log(categoryRef);
    let categoryDel;
    categoryRef.on('value', (snapshot) => {
      categoryDel = snapshot.val();
    });

    if (categoryDel !== "Other") { //check that we are not deleting 'Other' category
      let pantryRef = fire.database().ref(this.state.uid + '/pantryItems').orderByChild('items'); //get list of user's ingredients

      let items = {};
      pantryRef.on('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          //console.log(childSnapshot.val().category)
          if (childSnapshot.val().category === categoryDel) {
            console.log("HELLOOOOOOOOOOOOOOO")
            //console.log(childSnapshot.key.category)
            //console.log(childSnapshot.child("category").val());
            childSnapshot.val().category = "Other";
            console.log(childSnapshot.val().category)

            let ref = fire.database().ref(this.state.uid + '/pantryItems/' + childSnapshot.key.toString());
            ref.set({
              category: "Other",
              item: childSnapshot.val().item,
              recipeIDs: childSnapshot.val().recipeIDs
            })
              .catch(err => { console.log('Error: ', err); });
            //console.log(childSnapshot.key.category);
          }
          //console.log(childSnapshot.category)
          items[childSnapshot.key] = childSnapshot.val()
          console.log(items[childSnapshot.key])
        });

        this.setState({
          items: items,
        });
      });

      categoryRef.remove();

      //before removing category, move (can you simply modify the associated category to Other) all ingredients in current category over to the Other category
    } else {
      alert(`Can't remove ${key.toString()} category.`)
    }
  }

  removeItemFromPantry(key, loggedIn, uid) {
    if (loggedIn) {
      let ref = fire.database().ref(uid + '/pantryItems/' + key.toString());
      ref.set({ item: null })
        // .then( () => {console.log(`${key} removed from pantry`);})
        .catch(err => { console.log('Error: ', err); });
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
      // console.log('items in viewPantry are: ', this.state.items);
      return (
        <PantryGrid
          ingredients={this.state.items}
          removeItemFromPantry={this.removeItemFromPantry}
          loggedIn={this.state.loggedIn}
          uid={this.state.uid}
        />
      )
    } else {
      return null;
    }
  }

  //Modal functions
  handleExit() {
    //console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleOpen() {
    //console.log(e);
    console.log(this.state.visible);
    this.setState({
      visible: true,
    });
    //console.log(this.state.visible);
  }


  render() {
    return (
      <div>
        <div>
          <AddIngredModal
            requestAdd={this.requestAdd}
            loggedIn={this.state.loggedIn}
            categories={this.state.categories}
          />
          <this.viewPantry />
        </div>

        <button className="tab-box" onClick={() => this.removeCategory("-MVQIbQhWOaEFcC_m_n1")}> Remove Category</button>
        <Tabs removeCategory={this.removeCategory}>
          <div label="Drake">
            <div className="tab-box">
              Shake and bake, <em>Drake</em>!
            </div>
          </div>
          <div label="Gator">
            <div className="tab-box">
              See ya later, <em>Alligator</em>!
            </div>
          </div>
          <div label="Croc">
            <div className="tab-box">
              After 'while, <em>Crocodile</em>!
            </div>
          </div>
          <div label="Sarcosuchus">
            <div className="tab-box">
              Nothing to see here, this tab is <em>extinct</em>!
            </div>
          </div>
          <div label="+" onClick={() => this.handleOpen()}>
            <div className="tab-box">
              <button className="tab-box" onClick={this.handleOpen}>Add category</button>
              <CategoryModal
                handleOpen={this.handleOpen}
                handleExit={this.handleExit}
                visible={this.state.visible}
                updateCategories={this.updateCategories}
              />
            </div>
          </div>
        </Tabs>
      </div>
    );
  }
}
//<button className="tab-box" onClick={this.handleOpen}>Add category</button>
export default Pantry;