import React from 'react';
import fire from "../SignIn/fire"
import "firebase/database"
import AddIngredModal from './AddIngredModal'
import CheckError from "../MealDB/checkerror";

class Pantry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {},
            itemsToAdd: {},
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
           // TODO: Go through the categories
           // Automatically create "other" category if it doesn't exist
           var itemsRef = fire.database().ref(uid + 'pantryItems/').orderByChild('items');
           itemsRef.on('value', (snapshot) => {
               let items = [];
               snapshot.forEach((childSnapshot) => {
                   let val  = childSnapshot.val();
                   items.push(val);
               })
                this.setState({
                    items: items,
                    uid: uid,
                    loggedIn: true,
                });
            })
        }
   }

    viewPantry() {
        if(this.state.loggedIn) {
            let items = this.state.items;
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

    /** 
     * addItemToPantry: add an item to the user's pantry, if the item is already present alert the user
     * @param {string} ingredient to be added to the user's pantry
     * @param {string} category to which this ingredient belongs
     * @param {string} recipeIDs of recipes in which this ingredient is used
    */
    addItemToPantry(ingredient, category, recipeIDs) {
        if(this.state.loggedIn) {
            var itemRef = fire.database().ref(this.state.uid + 'pantryItems/');
            var items = itemRef.orderByChild('items');
            var itemAlreadyInPantry = false;
            items.on('value', (snapshot) => {
                let items = [];
                snapshot.forEach((childSnapshot) => {
                    let val = childSnapshot.val();
                    items.push(val);
                })
                items.forEach(elem => {
                    if(elem.item.toString().localeCompare(ingredient) === 0) {
                        itemAlreadyInPantry = true;
                    }
                });
            });
            if(itemAlreadyInPantry)
            {
                alert(`${ingredient} is already in your pantry`);
                return;
            }
            console.log('An item was submitted: ' + ingredient);
            var newItemRef = itemRef.push();
            newItemRef.set({
                item: ingredient,
                category: category,
                recipeIDs: recipeIDs,
            })
            //TODO: Update category entry
        }
    }

    /**
     * requestAdd: Handle a request to add an item to the pantry by fetching matching recipes
     * @param {string} ingredient to be added to pantry
     * @param {string} category to which this ingredient belongs
     */
     requestAdd(ingredient, category) {
        // Fetch the list of valid ingredients
         // TODO: Add category if not in list of categories
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
        // console.log(recipeList);
        let ids = [];
        for (const index in recipeList) {
            // console.log(recipe);
            ids.push(recipeList[index]['idMeal'])
        }
        return (ids);
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