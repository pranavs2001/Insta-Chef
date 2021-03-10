import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import { faSearch, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchInPantryModal from './SearchInPantryModal'
import fire from '../SignIn/fire';
import "firebase/database";
import './PantryGrid.css'

class PantryGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isLoaded: false,
      recipeIDs: [],
      loggedIn: props.loggedIn,
      uid: props.uid,
      removeItemFromPantry: props.removeItemFromPantry,
      ingredients: props.ingredients,
      test: false,
    }
  }
  
  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
    if(prevProps.ingredients !== this.props.ingredients) {
      this.setState({
        ingredients: this.props.ingredients
      })
    }
  }
  
  afterOpen = () => {};
  closeModal = () => {this.setState({isOpen: false})};
  openModal = () => { this.setState({ isOpen: true }) };

  getRecipeIDs = (key) => {
      let recipeIDs = [];
      let pantryRef = fire.database().ref(this.state.uid + '/pantryItems/' + key.toString());
      let recipesForIngred = pantryRef.child('recipeIDs')
      recipesForIngred.on('value', (snapshot) => {
        // loop through ingredient's associated recipeIDs
        snapshot.forEach((childSnapshot) => {
          recipeIDs.push(childSnapshot.val())
        })
      })
      // console.log('recipeIds in getrecipieIds are: ', recipeIDs);
      this.setState({
        loaded: true,
        isOpen: true,
        recipeIDs: recipeIDs,
      })
  };

  render () {
    // console.log('ingredients in render of PantryGrid are: ', this.state.ingredients);
    return(
      <div key={this.state.ingredients} >
        <div style={{ marginTop: "30px" }} >
          <Grid container spacing={1}>
            {Object.keys(this.state.ingredients).map((key, id) => (
              <Grid key={key} item xs={3}>
                <div>
                  {/*className={classes.button}*/}
                  <button onClick={() => this.getRecipeIDs(key)}> 
                    Search {<FontAwesomeIcon icon={faSearch} />}
                  </button>
                  <SearchInPantryModal
                    isLoaded={this.state.isLoaded}
                    isOpen={this.state.isOpen}
                    afterOpen={this.afterOpen}
                    closeModal={this.closeModal}
                    ingredKey={key}
                    uid={this.state.uid}
                    recipeIDs={this.state.recipeIDs}
                  />
                  {/* className={classes.button} */}
                  <button onClick={() => this.state.removeItemFromPantry(key, this.state.loggedIn, this.state.uid)}>
                    Remove {<FontAwesomeIcon icon={faWindowClose} />}
                  </button>
                  <li style={{marginBottom: "10px"}} key={key}>{this.state.ingredients[key].item}</li>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    )
  }
}

export default PantryGrid;
