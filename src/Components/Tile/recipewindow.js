import React from 'react';
import Modal from 'react-modal';
import './recipewindow.css';

// Button to toggle whether a user wants to save an recipe to their favorites
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
  // Wait while loading the recipe from TheMealDB
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
        <div>
          <h1>{props.recipe.name}</h1>
          <table>
            <tbody>
              <tr>
                <td className="recipe-details">
                  <h4>Category: {props.recipe.category}</h4>
                  <h4>Area: {props.recipe.area}</h4>
                  <h4>Video: {<a href={props.recipe.video} target={"_blank"}>Link</a>}</h4>
                  <h4>Ingredients:</h4>
                  {Object.keys(props.recipe.ingredients).map((name, index) =>
                    <li key={index}>{name}: {props.recipe.ingredients[name]}</li>
                  )}
                </td>
                <td>
                  <img className="recipe-image"
                    src={props.recipeImage} width="300px" height="300px" alt="Recipe Image"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <h4>Steps:</h4>
          {props.recipe.instructions.split('\n').map((i, index) => {
            return <p className="steps" key={index}>{i}</p>
          })}
        </div>
      </Modal>
    );
  }
}

export default RecipeWindow;