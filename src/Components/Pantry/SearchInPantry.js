import Tile from '../Tile/tile'
import Grid from '@material-ui/core/Grid';
import './PantryGrid.css'

function SearchInPantry(props) {
  // console.log('props.recipeIDs in SearchInPantry are: ', props.recipeIDs);
  // now that we have associated recipe id's, show them in a grid

  // Callback function to make favoriting recipes work
  function callback() {

  }

  if (props.recipeIDs !== undefined) {
    let lists = props.recipeIDs.map((id, index) => {
      return (
        <div key={id}>
          <Grid style={{margin: "20px"}} item xs={20}>
            <Tile recipeid={id} callback={callback}/>
          </Grid>
        </div>
      )
    });
    return (
      <div>
        <Grid container>
          {lists}
        </Grid>
      </div>
    )
  } else {
    return (
      <div>
        <p>No matching recipes</p>
      </div>
    )
  }
}

export default SearchInPantry;