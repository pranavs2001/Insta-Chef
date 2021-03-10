import './LoginPage.css';
import React, {useState, useEffect} from "react";
import Login from './Login';
import fire from './fire';
import 'firebase/auth'
import Pantry from '../Pantry/Pantry';
import Home from '../Home/Home'
import Navbar from '../Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';
import Search from '../MealDB/search';
import Profile from "../Profile/Profile";
import FavoriteRecipes from "../FavoriteRecipes/FavoriteRecipes";
import Navbar2 from "../Navbar/Navbar2";

function LoginPage() {

  //set up the initial states//
  const [user, setUser] = useState(''); 
  const[email, setEmail] = useState(''); 
  const[password, setPassword] = useState('');
  const[emailError, setEmailError] = useState('');
  const[passwordError, setPasswordError] = useState('');
  const[hasAccount, setHasAccount] = useState(false);

  //two cleanup functions to clear inputs and error messages
  const clearInputs = () => {
    setEmail('');
    setPassword('');
  }

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  }

  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email,password)
      .catch(err => {
        switch(err.code){
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
  }

  const handleSignup = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email,password)
      .catch(err => {
        switch(err.code){
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      });
  }

  const handleLogout = () => {
    fire.auth().signOut();
  }

  const authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if(user){
        clearInputs();         //whenever we have a user
        setUser(user);
      }
      else {                   //set User to emtpy string if no user
        setUser("");
      }
    });
  }

  useEffect(() =>{
    authListener()             //listen to events
  }, [])


  return (
    <div className="LoginPage">
      {/* <p>Insta-chef</p>
      <Search /> */}
      {/* render Welcome if the user exists, and login if the user doesn't exist */}
      {/* user exists if you've signed up or logged in */}
      {user ? (
            
      <div className="App">
        <Router>
        {/* <Navbar loggedIn={fire.auth().currentUser} /> */}
        <Navbar2></Navbar2>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/Login" component={LoginPage} />
            <Route path="/Search" component={Search} />
            <Route path="/Pantry" component={Pantry} />
            <Route path="/Favorites" component={FavoriteRecipes} />
            <Route path="/Profile" component={Profile} />
          </Switch>
        </Router>
      </div>
    
      ): (
        <Login //with all possible states
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        handleSignup={handleSignup}
        hasAccount={hasAccount}
        setHasAccount={setHasAccount}
        emailError={emailError}
        passwordError={passwordError}
      />
      )}


    </div>
  );
}

export default LoginPage;
