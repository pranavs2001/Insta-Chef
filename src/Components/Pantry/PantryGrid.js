import React from 'react';
import Grid from '@material-ui/core/Grid';
import "firebase/database";
import IngredientTile from "./IngredientTile";
import './PantryGrid.css'

class PantryGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      test: false,
    }
  }

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
        <div className="GridContainer">
          <Grid container spacing={1}>
            {Object.keys(items).map((key, id) => (
              <Grid key={key} item xs={3}>
                  <IngredientTile
                    name={items[key].name}
                    recipeIDs={items[key].recipeIDs}
                    itemKey={key}
                    category={this.props.category}
                    removeItem={this.props.removeItemFromPantry}
                  />
              </Grid>
            ))}
          </Grid>
        </div>
      )
    }
  }
}



export default PantryGrid;
