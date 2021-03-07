// import { ReactComponent } from '*.svg';

import React, { useState } from 'react';
import Modal from 'react-modal';
import IngredientSearch from '../MealDB/ingredientsearch'
import { makeStyles } from '@material-ui/core/styles';
import "./Button.css";


const useStyles = makeStyles((theme) => ({


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

        
        
      },

      button1:{
        //display:'inline-flex',
        alignContent: 'left',
        borderRadius: '8px',
        borderColor: '#fa9483',
        // outline: 'none',
        //outline: '#fa9483',
        margin: '0px 0px 10px 0px  ',
        width: '5%',
        padding: '6px 6px ',
        // color: '#fff',
        color:'#fa9483',
        fontSize: '10px',
        letterSpacing: '1px',
        // background: '#fa9483',
        background: '#fff',
        cursor: 'pointer',
      },

    //   modal: {
    //     position: 'fixed',
    //     top: '50%',
    //     left: '50%',
    //     //transform: translate(-50%, -50%),
    //   }

      
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
                {/* <button style={{marginTop: "20px"}} onClick={openModal}>Add new Ingredient</button> */}
                {/* <button className={classes.button} onClick={openModal}>Add new Ingredient</button> */}
                <button class='btn-1' onClick={openModal}>Add new Ingredient</button>
                <Modal className={classes.modal}
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    contentLabel="Ingredient Search Box"
                >
                    <button className={classes.button1} onClick={closeModal}>Done</button>
                    {/* <button class='btn-1' onClick={closeModal}>Done</button> */}
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

        