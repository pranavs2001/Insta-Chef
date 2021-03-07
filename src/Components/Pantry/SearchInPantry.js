import Tile from '../Tile/tile'
import Grid from '@material-ui/core/Grid';

function SearchInPantry(props) {
  console.log('props.recipeIDs in SearchInPantry are: ', props.recipeIDs);
  // now that we have associated recipe id's, show them in a grid
  let lists =  props.recipeIDs.map((id, index) => {
    return(
      <div key={id} style={{ marginTop: "30px" }} >
        <Grid container alignItems={"center"}>
          <Grid item xs={3}>
            <Tile recipeid={id} />
          </Grid>
        </Grid>
      </div> 
  )})
  return (
    <div>
      {lists}
    </div>
  )
}

export default SearchInPantry;