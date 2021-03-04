import React from 'react'
import './ingredientSearch.css'

class IngredientListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'Other',
    };
    // this.getMealIDs = this.getMealIDs.bind(this);
  }

  render() {
    const ingredientName = this.props.item['name'];
    return (
      <div>
        <button
          className="add-button"
          onClick={() => this.props.requestAdd(ingredientName, this.state.category)}
          size="sm"
        >
          Add Item
        </button>
        {ingredientName}
        {/*<input>Select category</input>*/}
      </div>
    );
  }
}

// TODO: Function to specify category
// Pass in existing list of categories and give option to list new ones

export default IngredientListItem