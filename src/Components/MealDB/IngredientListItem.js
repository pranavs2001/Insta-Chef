import React from 'react'
import Dropdown from 'react-dropdown'
import './ingredientSearch.css'

class IngredientListItem extends React.Component {
  constructor(props) {
    super(props);
    // Category of the item as selected by the dropdown menu
    this.state = {
      category: 'Other',
    };
  }

  render() {
    const ingredientName = this.props.item['name'];
    let options = this.props.categories;
    // The "+" category is present for creation of tabs but unwanted here
    let index = options.indexOf('+');
    // Safety check
    if (index !== -1) {
      options.splice(index, 1);
    }
    return (
      <>
        <td>
          <button
            className="add-button"
            onClick={() => this.props.requestAdd(ingredientName, this.state.category)}
          >
            Add Item
          </button>
        </td>
        <td>
          <Dropdown
            className='select'
            menuClassName='option'
            placeholderClassName='choice'
            options={options}
            value={this.state.category}
            onChange={(selectedOption) => {
              this.setState({
                category: selectedOption['value'],
              })
            }}
          />
        </td>
        <td>
          {ingredientName}
        </td>
      </>
    );
  }
}

export default IngredientListItem