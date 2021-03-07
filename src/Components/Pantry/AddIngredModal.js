// import { ReactComponent } from '*.svg';

import React, { useState } from 'react';
import Modal from 'react-modal';
import IngredientSearch from '../MealDB/ingredientsearch'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    // modal: {
    //   display: 'flex',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    // },
    // paper: {
    //   backgroundColor: theme.palette.background.paper,
    //   border: '2px solid #000',
    //   boxShadow: theme.shadows[5],
    //   padding: theme.spacing(2, 4, 3),
    // },

    button:{
        border: 'none',
        outline: 'none',
        margin: '20px',
        width: '30%',
        padding: '15px 15px ',
        color: '#fff',
        fontSize: '16px',
        letterSpacing: '1px',
        background: '#fa9483',
        cursor: 'pointer',
      }

      
  }));

function AddIngredModal (props) {
    
    const classes = useStyles();
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
                <button className={classes.button} onClick={openModal}>Add new Ingredient</button>
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

        