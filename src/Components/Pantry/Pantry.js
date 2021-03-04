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
        this.viewPantry = this.viewPantry.bind(this);
        this.removeItemFromPantry = this.removeItemFromPantry.bind(this);
        this.addItemToPantry = this.addItemToPantry.bind(this);
    }

   componentDidMount() {
       //get latest pantry items 
       //if user is logged in
       if (fire.auth().currentUser) {
           let uid = fire.auth().currentUser.uid;
           var itemsRef = fire.database().ref(uid + '/pantryItems').orderByChild('items');
           itemsRef.on('value', (snapshot) => {
               let items = {};
               snapshot.forEach((childSnapshot) => {
                   items[childSnapshot.val().item] = childSnapshot.key
               })
                this.setState({
                    items: items,
                    uid: uid,
                    loggedIn: true,
                });
            })
        }
   }

   componentWillUnmount() {

   }

    viewPantry() {
        if(this.state.loggedIn) {
            return (
                Object.keys(this.state.items).map((item, id) => {
                    return(
                        <div>
                            <button onClick={() => this.removeItemFromPantry(item)}>remove</button>
                            <li key={this.state.items[item]}>{item}</li>
                        </div>
                    )
                })
            )
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
            var itemRef = fire.database().ref(uid + '/pantryItems');
            var itemsInFire = itemRef.orderByChild('item');
            var itemAlreadyInPantry = false;
            // check if item is already in pantry
            itemsInFire.on('value', (snapshot) => {
                // loop through firebase
                snapshot.forEach((childSnapshot) => {
                    if (childSnapshot.val().item.toString().localeCompare(item) == 0) {
                        itemAlreadyInPantry = true;
                    }
                })
            });
            if(itemAlreadyInPantry)
            {
                alert(`${item} is already in your pantry`);
                return;
            }
            // add the item to Firebase
            var newItemRef = itemRef.push();
            newItemRef.set({
                item: item,
            })
            // add the item to Pantry's state
            let key = newItemRef.key;
            let items = this.state.items;
            items[item] = key;
            this.setState({
                items: items,
            });
        }
    }

    removeItemFromPantry(item) {
        if(this.state.loggedIn) {
            let key = this.state.items[item];
            var ref = fire.database().ref(this.state.uid + '/pantryItems/' + key.toString());
            ref.set({item: null})
                .then( () => {console.log(`${item} removed from pantry`);})
                .catch(err => {console.log('Error: ', err);});
        } else {
            alert(`Can't remove ${item} you need to login first`)
        }
    }

    render() {
        return (
            <div className="test">
                {/* <button onClick={this.removeItemFromPantry}>remove</button> */}
                <div className="pantry" style={{display: "flex", justifyContent: "center"}}>
                    <div className="pantryItems" style={{diplay: "inlineBlock", textAlign: "left"}}>
                        <this.viewPantry/>
                    </div>
                    <div style={{margin: "50px"}}>
                        <AddIngredModal addItemToPantry={this.addItemToPantry} 
                        loggedIn={this.state.loggedIn} uid={this.state.uid}/>
                    </div>
                </div>
            </div>
        );
    }

}

export default Pantry;