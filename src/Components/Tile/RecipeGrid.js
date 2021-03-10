import React from 'react';
import Grid from '@material-ui/core/Grid';
import Tile from './tile'


export default function RecipeGrid(props) {
  if (props.recipes.length > 0) {
    return (
      <div style={{ backgroundColor: "rgb(202, 230, 240)"}}>
        <div style={{marginTop: "30px"}}>
          <Grid container spacing={1}>
            {Object.keys(props.recipes).map((id, index) => (
              <Grid item xs={3} key={props.recipes[index]['id']}>
                <Tile recipeid={props.recipes[index]['id']} callback={props.callback}/>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    )
  } else {
    return (
      <p>No Matching Recipes</p>
    )
  }
}
