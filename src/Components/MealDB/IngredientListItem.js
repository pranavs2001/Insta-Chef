import React, { Fragment } from 'react'
import Dropdown from 'react-dropdown'
import './ingredientSearch.css'

class IngredientListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'Other',
    };
    // console.log(props.categories)
    // this.getMealIDs = this.getMealIDs.bind(this);
  }

  render() {
    const ingredientName = this.props.item['name'];
    let options = this.props.categories;
    let index = options.indexOf('+');
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
          {/*TODO: format dropdown*/}
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