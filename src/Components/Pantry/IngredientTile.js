import React, { useState } from 'react';
import Modal from 'react-modal';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faWindowClose} from "@fortawesome/free-solid-svg-icons";
import SearchInPantry from './SearchInPantry';
import "./PantryGrid.css"

function IngredientTile (props) {
  Modal.setAppElement(document.getElementById('root'));

  const [modalIsOpen, setIsOpen] = useState(false);

  // Called when modal is opened
  function openModal() {
      setIsOpen(true);
  }

  function afterOpenModal() {
      // Stylistic changes after modal window opens
  }

  // called when modal is closed
  function closeModal() {
      setIsOpen(false);
  }
  return(
    <div className="IngredientTile">
      <div style={{marginBottom: "5px"}}>{props.name}</div>
      <button className="SearchButton" onClick={openModal}>
        View Recipes {<FontAwesomeIcon icon={faSearch} />}
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        animationType="fade"
        transparent={true}
        contentLabel="Pantry Recipe"
      >
        <button className="button-style" onClick={closeModal}>← Close</button>
        <h1>Recipes for {props.name}</h1>
        <SearchInPantry recipeIDs={props.recipeIDs}/>
      </Modal>
      <button className="RemoveButton" onClick={() => {props.removeItem(props.itemKey, props.category)}}>
        Remove {<FontAwesomeIcon icon={faWindowClose}/>}
      </button>
    </div>
  )
}

export default IngredientTile;