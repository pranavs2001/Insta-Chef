import React from 'react'
import Modal from 'react-modal'


// Modal.setAppElement(document.getElementById('root'))

function ListIngredients(props) {
  return (
    Object.keys(props.ingredients).map((name, index) =>
      <li key={index}>{name}: {props.ingredients[name]}</li>
    )
  )
}

function RecipeWindow(props) {

  if (props.loaded == false) {
    return (
      <p>Loading Recipe...</p>
    )
  } else {
    return (
      <Modal
        isOpen={props.isOpen}
        onAfterOpen={props.afterOpen}
        onRequestClose={props.closeModal}
        contentLabel="Recipe Info"
      >
        <button onClick={props.closeModal}>Close</button>
        <h2>{props.recipe.name}</h2>
        <h4>Category: {props.recipe.category}</h4>
        <h4>Area: {props.recipe.area}</h4>
        <h4>Ingredients:</h4>
        <ListIngredients ingredients={props.recipe.ingredients}/>
        <h4>Steps:</h4>
        <p>{props.recipe.instructions}
        </p>
      </Modal>
    );
  }

}

export default RecipeWindow;