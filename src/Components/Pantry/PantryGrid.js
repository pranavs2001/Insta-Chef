import React from 'react';
import Grid from '@material-ui/core/Grid';

export default function PantryGrid(props) {
  return (
    <div>
      <div style={{ marginTop: "30px" }} >
        <Grid container spacing={1}>
          {Object.keys(props.ingredients).map((key, id) => (
            <Grid item xs={3}>
              <button onClick={() => props.removeItemFromPantry(key, props.loggedIn, props.uid)}>
                Remove
              </button>
              <li key={key}>{props.ingredients[key].item}</li>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}
