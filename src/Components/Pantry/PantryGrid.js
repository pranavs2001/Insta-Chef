import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
// import Button from '@material-ui/core/Button'
import SearchWithPantryIngred from './SearchWithPantryIngred';
import { useHistory } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { faSearch, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


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
  const history = useHistory();
  return (
    <div>
      <div style={{ marginTop: "30px" }} >
        <Grid container spacing={1}>
          {Object.keys(props.ingredients).map((key, id) => (
            <Grid key={key} item xs={3}>
              <button className={classes.button} onClick={() => props.removeItemFromPantry(key, props.loggedIn, props.uid)}>
                Remove {<FontAwesomeIcon icon={faWindowClose} />}
              </button>
              {/* <button className={classes.button} onClick={() => props.SearchWithPantryIngred(key, props.uid, history)}>
                Search
                </button> */}
              <div>
                <button className={classes.button} onClick={() => history.push('/Search')}>
                  Search {<FontAwesomeIcon icon={faSearch} /> }
                </button>
                {/* <Route path={"/Search"} component={SearchWithPantryIngred}/> */}
              </div>
              <li key={key}>{props.ingredients[key].item}</li>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}

// export default () => {
//   <div>
//     <Router>
//       <Route component={PantryGrid}/>
//     </Router>
//   </div>
// }