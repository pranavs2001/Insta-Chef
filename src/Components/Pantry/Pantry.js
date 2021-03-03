import React from 'react';
import fire from "../SignIn/fire"
import "firebase/database"
import AddIngredModal from './AddIngredModal'

class Pantry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {},
            uid: '',
            itemAdded: '',
            loggedIn: false,
        };
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.viewPantry = this.viewPantry.bind(this);
        // this.addItemForm = this.addItemForm.bind(this);
    }

   componentDidMount() {
       //get latest pantry items 
       //if user is logged in
       if (fire.auth().currentUser) {
           let uid = fire.auth().currentUser.uid;
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
     * @param {string} item item to be added to the user's pantry
     * @param {boolean} loggedIn whether the user is logged in or not
     * @param {string} uid  the current user's uid
    */
    addItemToPantry(item, loggedIn, uid) {
        if(loggedIn) {
            var itemRef = fire.database().ref(uid + 'pantryItems/');
            var items = itemRef.orderByChild('items');
            var itemAlreadyInPantry = false;
            items.on('value', (snapshot) => {
                let items = [];
                snapshot.forEach((childSnapshot) => {
                    let val = childSnapshot.val();
                    items.push(val);
                })
                items.forEach(elem => {
                    if(elem.item.toString().localeCompare(item) == 0) {
                        itemAlreadyInPantry = true;
                    }
                });
            });
            if(itemAlreadyInPantry)
            {
                alert(`${item} is already in your pantry`);
                return;
            }
            console.log('An item was submitted: ' + item);
            var newItemRef = itemRef.push();
            newItemRef.set({
                item: item,
            })
        }
    }

    render() {
        return (
            <div className="test">
                <div className="pantry" style={{display: "flex", justifyContent: "center"}}>
                    <div className="pantryItems" style={{diplay: "inlineBlock", textAlign: "left"}}>
                        <this.viewPantry/>
                    </div>
                    <AddIngredModal addItemToPantry={this.addItemToPantry} 
                    loggedIn={this.state.loggedIn} uid={this.state.uid}/>
                </div>
            </div>
        );
    }

}

export default Pantry;