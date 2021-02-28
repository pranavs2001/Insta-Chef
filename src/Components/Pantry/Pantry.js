import React from 'react';
import fire from "../SignIn/fire"
import "firebase/database"

class Pantry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {},
            uid: '',
            itemAdded: '',
            loggedIn: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.viewPantry = this.viewPantry.bind(this);
        this.addItemForm = this.addItemForm.bind(this);
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
            return null;
        }
    }

    handleChange(e) {
        this.setState({ itemAdded: e.target.value });
    }

    // add item to pantry on submit
    handleSubmit(e) {
        e.preventDefault();
        if(this.state.loggedIn)
        {
            console.log('An item was submitted: ' + this.state.itemAdded);
            var itemRef = fire.database().ref(this.state.uid + 'pantryItems/');
            var newItemRef = itemRef.push();
            newItemRef.set({
                item: this.state.itemAdded,
            })
            this.setState({
                itemAdded: '',
            })
        } 
    }

    addItemForm() {
        if(this.state.loggedIn) {
            return(
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Add an item to your Pantry:
                            <input type="text" value={this.state.itemAdded} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Add" />
                </form>
            )
        } else {
            return(
                <h3>You need to login before viewing your Pantry.</h3>
            )
        }
    }

    render() {
        return (
            <div className="test">
                <this.addItemForm/>
                <div className="pantry" style={{display: "flex", justifyContent: "center"}}>
                    {/* <button onClick={this.viewPantry}> view pantry </button> */}
                    <div className="pantryItems" style={{diplay: "inlineBlock", textAlign: "left"}}>
                        <this.viewPantry/>
                    </div>
                </div>
            </div>
        );
    }

}

export default Pantry;