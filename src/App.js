import React from 'react'
import './App.css';
import './index.css';
import LoginPage from './Components/SignIn/LoginPage';
import Search from './Components/MealDB/search';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Pantry from './Components/Pantry/Pantry';

function App() {

  return (
    <LoginPage/>
  );
}
  export default App;
