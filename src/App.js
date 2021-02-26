import './App.css';
import LoginPage from './Components/SignIn/LoginPage';
import Search from './search';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// import NavBar from './Components/NavigationBar/NavBar';
//import Navbar from './Components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <LoginPage/>
      {/* <Navbar/> */}
      {/* <Switch> */}
        {/* <Route path="/" exact component={Home}/>
        <Route path="/Login" component={LoginPage}/>
        <Route path="/Search" component={Search}/> */}
      {/* <p>Insta-chef</p> */}
      {/* <LoginPage/> */}
      {/* </Switch> */}
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