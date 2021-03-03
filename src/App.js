import React from 'react'
import Modal from 'react-modal'
import './App.css';
import LoginPage from './Components/SignIn/LoginPage';
import Search from './search';
import Tile from './tile'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Pantry from './Components/Pantry/Pantry';

function App() {

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Login" component={LoginPage} />
          <Route path="/Search" component={Search} />
          <Route path="/Pantry" component={Pantry} />
          <p>Insta-chef</p>
          <LoginPage />
        </Switch>

        <div>
          {/* <Search /> */}
        </div>
        <div>
          {/* <Tile recipeid={52772} /> */}
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
