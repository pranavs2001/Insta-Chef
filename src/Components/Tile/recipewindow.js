import React from 'react';
import Modal from 'react-modal';
import './recipewindow.css';


// Modal.setAppElement(document.getElementById('root'))

function ListIngredients(props) {
  return (
    Object.keys(props.ingredients).map((name, index) =>
      <li key={index}>{name}: {props.ingredients[name]}</li>
    )
  )
}

function FavoriteButton(props) {
  if (props.loggedIn) {
    return (
        <button className="favorite-button" onClick={props.toggleFavorite}>
          {props.isFavorite ? "Remove from " : "Add to "} favorites
        </button>
    );
  }
}

function RecipeWindow(props) {

  if (props.loaded === false) {
    return (
      <p>Loading Recipe...</p>
    )
  } else {
    return (
      <Modal
        isOpen={props.isOpen}
        onAfterOpen={props.afterOpen}
        onRequestClose={props.closeModal}
        animationType="fade"
        transparent={true}
        contentLabel="Recipe Info"
      >
        <button className="button-style" onClick={props.closeModal}>← Close</button>
        <FavoriteButton
          loggedIn={props.loggedIn}
          isFavorite={props.isFavorite}
          toggleFavorite={props.toggleFavorite}
        />
        <h1>{props.recipe.name}</h1>
        <h4>Category: {props.recipe.category}</h4>
        <h4>Area: {props.recipe.area}</h4>
        <h4>Video: {<a href={props.recipe.video} target={"_blank"}>Link</a>}</h4>
        <h4>Ingredients:</h4>
        <ListIngredients ingredients={props.recipe.ingredients}/>
        <h4>Steps:</h4>
        {props.recipe.instructions.split('\n').map((i, index) => {
          return <p className="steps" key={index}>{i}</p>
        })}
      </Modal>
    );
  }
}

export default RecipeWindow;