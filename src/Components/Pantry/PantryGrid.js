import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import "./Button.css";
const useStyles = makeStyles((theme) => ({


  button:{
      position: 'relative',
      borderRadius: '8px',
      borderColor: '#fa9483',
      // outline: 'none',
      outline: '#fa9483',
      margin: '20px',
      width: 'auto',
      padding: '1.2em',
      // color: '#fff',
      color:'#fa9483',
      fontSize: '10px',
      letterSpacing: '1px',
      // background: '#fa9483',
      background: '#fff',
      cursor: 'pointer',


    },

    div:{
      
      background:'rgba(45, 67, 87, 0.8) 60%',
      padding: '30px',
      borderRadius: '8px',
      width:'auto',
      position:'relative',
    },

    list:{
      color:'white',
      listStyleType: 'none',
      width:'auto',
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
              <div className={classes.div}>
              <button className={classes.button} onClick={() => props.removeItemFromPantry(key, props.loggedIn, props.uid)}>
                Remove
              </button>
              <li className={classes.list} key={key}>{props.ingredients[key].item}</li>
              </div>
            </Grid>
            
          ))}
         
        </Grid>
      </div>
    </div>
  )
}
