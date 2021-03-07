import React from 'react';
import SearchInPantry from './SearchInPantry';
import Modal from 'react-modal';

function SearchInPantryModal(props) {
  if (props.loaded === false) {
    return (
      <p>Loading Pantry Recipe...</p>
    )
  } else {
    return(
      <Modal
        isOpen={props.isOpen}
        onAfterOpen={props.afterOpen}
        onRequestClose={props.closeModal}
        animationType="fade"
        transparent={true}
        contentLabel="Pantry Recipe"
      >
        <button className="button-style" onClick={props.closeModal}>← Close</button>
        <SearchInPantry recipeIDs={props.recipeIDs}/>
      </Modal>
    )
  }
}

export default SearchInPantryModal;