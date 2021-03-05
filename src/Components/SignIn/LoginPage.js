import './LoginPage.css';
import React, {useState, useEffect} from "react";
import Login from './Login';
import Hero from './Hero';
import fire from './fire';
import Pantry from '../Pantry/Pantry';
import Navbar from '../Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Search from '../MealDB/search';

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
        <Navbar loggedIn={fire.auth().currentUser} />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/Login" component={LoginPage} />
            <Route path="/Search" component={Search} />
            <Route path="/Pantry" component={Pantry} />
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

const Home = () => (
  <div>
    <div class="box-1">
      <h1>INSTA CHEF</h1>
    </div>

    <div class="box-pantry">
      <h2>About Our Staff:</h2>
      <p1> Drake Cote: hates coffee but was a barista<br /></p1>
      <p2> Solaine Zhao: frolocks through meadows in nature<br /></p2>
      <p3> Bradley Schultz: was once awake past 1 AM<br /></p3>
      <p4> Pranav Srinivasan: loves to dunk on Bradley<br /></p4>
      <p5> Jonathan Carlson: loves long walks on the beach<br /></p5>
    </div>
  </div>
)

export default LoginPage;
