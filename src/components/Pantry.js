import React from 'react';
import firebase from "../firebase"
import "firebase/database"

class Pantry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {},
            uid: '',
            itemAdded: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /*
    user has a form where they can add items to their pantry
    user can see items in their pantry
    pantry items are added to firestore, and connected to uid
    */


    handleChange(e) {
        this.setState({ itemAdded: e.target.value });
    }

    // add item to pantry on submit
    handleSubmit(e) {
        e.preventDefault();
        console.log('An item was submitted: ' + this.state.itemAdded);
        const itemsRef = firebase.database().ref('pantryItems');
        const item = {
            item: this.state.itemAdded,
        }
        itemsRef.push(item);
        this.setState({
            itemAdded: '',
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Add an item to your Pantry:  
                    <input type="text" value={this.state.itemAdded} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Add" />
            </form>
        );
    }

}

export default Pantry;