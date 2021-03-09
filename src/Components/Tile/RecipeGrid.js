import React from 'react';
import Grid from '@material-ui/core/Grid';
import Tile from './tile'


export default function RecipeGrid(props) {
  return (
      <div>
        <div style={{ marginTop: "30px" }} >
          <Grid container spacing={1}>
            {Object.keys(props.recipes).map((id, index) => (
              <Grid key={props.recipes[index]['id']} item xs={3}>
                <Tile recipeid={props.recipes[index]['id']} />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    )
}
