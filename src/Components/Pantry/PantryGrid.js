import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import { faSearch, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "firebase/database";
import './PantryGrid.css'
import IngredientTile from "./IngredientTile";

class PantryGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      // ingredients: props.ingredients,
      test: false,
    }
  }

  // componentDidUpdate(prevProps) {
  //   if(prevProps.ingredients !== this.props.ingredients) {
  //     this.setState({
  //       ingredients: this.props.ingredients
  //     })
  //   }
  // }

  //issue is that PantryGrid's ingredient's list doesn't update, on Pantry's componentDidMount
  render () {
    const items = this.props.ingredients;
    // console.log(items);
    if (items === undefined) {
      return (
        <div>
          <h2>No matching ingredients</h2>
        </div>
      );
    } else {
      return (
        <div style={{marginTop: "30px"}}>
          <Grid container spacing={1}>
            {Object.keys(items).map((key, id) => (
              <Grid key={key} item xs={3}>
                  {/*className={classes.button}*/}
                  <IngredientTile
                    name={items[key].name}
                    recipeIDs={items[key].recipeIDs}
                    itemKey={key}
                    category={this.props.category}
                    removeItem={this.props.removeItemFromPantry}
                  />
                  {/* className={classes.button} */}
              </Grid>
            ))}
          </Grid>
        </div>
      )
    }
  }
}



export default PantryGrid;
