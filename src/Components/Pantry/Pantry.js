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
      // Automatically create "other" category if it doesn't exist
      let pantryRef = fire.database().ref(uid + '/pantryItems').orderByChild('items');
      pantryRef.on('value', (snapshot) => {
        let items = {};
        snapshot.forEach((childSnapshot) => {
          items[childSnapshot.key] = childSnapshot.val()
        })
        this.setState({
          items: items,
        })
      });
      // Get ingredient categories
      let categoryRef = fire.database().ref(this.state.uid + '/categories').orderByValue();
      console.log(categoryRef);
      categoryRef.on('value', (snapshot) => {
        let categories = [];
        snapshot.forEach((childSnapshot) => {
          categories.push(childSnapshot.val());
          console.log(childSnapshot);
        });
        console.log(categories);
        // Reformat category list to put "Other" at the end
        const index = categories.indexOf('Other');
        if (index !== -1) {
          categories.splice(index,1);
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
    if (this.state.loggedIn) {
      let itemRef = fire.database().ref(this.state.uid + '/pantryItems/');
      let itemsInFire = itemRef.orderByChild('items');
      let itemAlreadyInPantry = false;
      itemsInFire.on('value', (snapshot) => {
        // loop through firebase
        snapshot.forEach((childSnapshot) => {
            if (childSnapshot.val().item.toString().localeCompare(ingredient) == 0) {
                itemAlreadyInPantry = true;
            }
        })
      });
      if(itemAlreadyInPantry)
      {
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
      console.log(vals);
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
    console.log(category)
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


  removeItemFromPantry(key, loggedIn, uid) {
    if(loggedIn) {
        let ref = fire.database().ref(uid + '/pantryItems/' + key.toString());
        ref.set({item: null})
            .then( () => {console.log(`${key} removed from pantry`);})
            .catch(err => {console.log('Error: ', err);});
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
      const ingredients = this.state.items;
      // console.log(ingredients);
      return (
        <PantryGrid 
          ingredients={ingredients} 
          removeItemFromPantry={this.removeItemFromPantry} 
          loggedIn={this.state.loggedIn}
          uid={this.state.uid}
        />
      )
    } else {
      return null;
    }
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
          <this.viewPantry/>
        </div>
        <Tabs> 
          <div label="Gator"> 
            See ya later, <em>Alligator</em>! 
          </div> 
          <div label="Croc"> 
            After 'while, <em>Crocodile</em>! 
          </div> 
          <div label="Sarcosuchus"> 
           Nothing to see here, this tab is <em>extinct</em>! 
          </div> 
        </Tabs> 
      </div>
    );
  }
}

export default Pantry;