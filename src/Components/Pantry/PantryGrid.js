import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';

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





export default function PantryGrid(props) {
  const classes = useStyles();
  return (
    <div>
      <div style={{ marginTop: "30px" }} >
        <Grid container spacing={1}>
          {Object.keys(props.ingredients).map((key, id) => (
            <Grid item xs={3}>
              <button className={classes.button} onClick={() => props.removeItemFromPantry(key, props.loggedIn, props.uid)}>
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
