// import { ReactComponent } from '*.svg';
import React, { useState } from 'react';
import Modal from 'react-modal';
import IngredientSearch from '../MealDB/ingredientsearch'

function AddIngredModal (props) {
    
    Modal.setAppElement(document.getElementById('root'))

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

    if(props.loggedIn)
    {
        return (
            <div>
                <button onClick={openModal}>Add new Ingredient</button>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    contentLabel="Ingredient Search Box"
                >
                    <button onClick={closeModal}>Done</button>
                    <IngredientSearch
                      requestAdd={props.requestAdd}
                      categories={props.categories}
                    />
                </Modal>
            </div>
        )
    } else {
        return null;
    }
}

export default AddIngredModal;

        