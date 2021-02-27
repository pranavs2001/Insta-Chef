import React from 'react'
import Modal from 'react-modal'
import './App.css';
import LoginPage from './Components/SignIn/LoginPage';
import Search from './search';
import IngredientSearch from './Components/MealDB/ingredientsearch'
import Tile from './tile'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './Components/Navbar';

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
    <Router>
      <div className="App">
      <Navbar/>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/Login" component={LoginPage}/>
        <Route path="/Search" component={Search}/>
      <p>Insta-chef</p>
      <LoginPage/>
      </Switch>

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
      <div>
        <Tile recipeid={52772}/>
      </div>
    </div>
    </Router>
    
  );
}

const Home = () => (
  <div>
    <h1> Home Page</h1>
  </div>
)
export default App;