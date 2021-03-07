import Tile from '../Tile/tile'
import Grid from '@material-ui/core/Grid';

function SearchInPantry(props) {
  // console.log('props.recipeIDs in SearchInPantry are: ', props.recipeIDs);
  // now that we have associated recipe id's, show them in a grid
  let lists =  props.recipeIDs.map((id, index) => {
    return(
      <div key={id}>
          <Grid item xs={3}>
            <Tile recipeid={id} />
          </Grid>
      </div> 
  )})
  return (
    <div>
      <Grid container>
        {lists}
      </Grid>
    </div>
  )
}

export default SearchInPantry;