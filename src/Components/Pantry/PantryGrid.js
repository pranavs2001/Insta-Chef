import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import { faSearch, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchInPantryModal from './SearchInPantryModal'
import fire from '../SignIn/fire';
import "firebase/database";

const useStyles = makeStyles((theme) => ({
  button:{
      flex:1,
      borderRadius: '8px',
      borderColor: '#fa9483',
      // outline: 'none',
      //outline: '#fa9483',
      margin: '20px',
      width: '30%',
      padding: '6px 6px ',
      // color: '#fff',
      color:'#fa9483',
      fontSize: '10px',
      letterSpacing: '1px',
      // background: '#fa9483',
      background: '#fff',
      cursor: 'pointer',
    }
}));

let recipeIDs = [];

export default function PantryGrid(props) {
  const classes = useStyles();
  const [isOpen, setOpen] = useState(false);
  const afterOpen = () => {};
  const closeModal = () => {setOpen(false)};
  const openModal = () => {setOpen(true)};
  const [isLoaded, setLoaded] = useState(false);
  return (
    <div>
      <div style={{ marginTop: "30px" }} >
        <Grid container spacing={1}>
          {Object.keys(props.ingredients).map((key, id) => (
            <Grid key={key} item xs={3}>
              <div>
                <button className={classes.button} onClick={() => {setLoaded(getRecipeIDs(recipeIDs, props.uid, key, openModal))}}>
                  Search {<FontAwesomeIcon icon={faSearch} />}
                </button>
                <SearchInPantryModal
                  isLoaded={isLoaded}
                  isOpen={isOpen}
                  afterOpen={afterOpen}
                  closeModal={closeModal}
                  ingredKey={key}
                  uid={props.uid}
                  recipeIDs={recipeIDs}
                />
                <button className={classes.button} onClick={() => props.removeItemFromPantry(key, props.loggedIn, props.uid)}>
                  Remove {<FontAwesomeIcon icon={faWindowClose} />}
                </button>
                <li style={{marginBottom: "10px"}} key={key}>{props.ingredients[key].item}</li>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}

const getRecipeIDs = (recipeIDs, uid, key, openModal) => {
  let pantryRef = fire.database().ref(uid + '/pantryItems/' + key.toString());
  let recipesForIngred = pantryRef.child('recipeIDs')
  recipesForIngred.on('value', (snapshot) => {
    // loop through ingredient's associated recipeIDs
    snapshot.forEach((childSnapshot) => {
      recipeIDs.push(childSnapshot.val())
    })
  })
  console.log('recipeIds in getrecipieIds are: ', recipeIDs);
  openModal()
  return true;
}

