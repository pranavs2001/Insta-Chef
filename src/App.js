import React from 'react'
import Modal from 'react-modal'
import './App.css';
import Search from './search';
import IngredientSearch from './ingredientsearch'

Modal.setAppElement(document.getElementById('root'))

function App() {
  const [modalIsOpen,setIsOpen] = React.useState(false);

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

  return (
    <div className="App">
      <p>Insta-chef</p>
      <button onClick={openModal}>Add new Ingredient</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Ingredient Search Box"
      >
        <button onClick={closeModal}>Done</button>
        <IngredientSearch/>
      </Modal>
      <div>
        <Search />
      </div>
    </div>
  );
}

export default App;
