import fire from '../SignIn/fire';
import "firebase/database";
import Tile from '../Tile/tile'
import Grid from '@material-ui/core/Grid';

function SearchWithPantryIngred(key, uid) {
  let recipeIDs = [];
  let pantryRef = fire.database().ref(uid + '/pantryItems/' + key.toString());
  let recipesForIngred = pantryRef.child('recipeIDs')
  recipesForIngred.on('value', (snapshot) => {
    // loop through ingredient's associated recipeIDs
    snapshot.forEach((childSnapshot) => {
      recipeIDs.push(childSnapshot.val())
    })
  })

  // now that we have associated recipe id's, go to Search and use them as props for Tiles
  return (
    <div>
      <div style={{ marginTop: "30px" }} >
        <Grid container spacing={1}>
          {recipeIDs.map((id, index) => {
            <Grid item xs={3}>
              <Tile recipeid={id} />
            </Grid>
          })}
        </Grid>
      </div>
    </div>
  )
}

export default SearchWithPantryIngred;