import React from 'react'
import './App.css';
import './index.css';
import LoginPage from './Components/SignIn/LoginPage';

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
    <div class="box-1">
      <h1>INSTA CHEF</h1>
    </div>

    <div class = "box-pantry">
      <h2>About Our Staff:</h2>
      <p1> Drake Cote: hates coffee but was a barista<br /></p1>
      <p2> Solaine Zhao: frolocks through meadows in nature<br /></p2>
      <p3> Bradley Schulz: was once awake past 1 AM<br /></p3>
      <p4> Pranav Srinivasan: loves to dunk on Bradley<br /></p4>
      <p5> Jonathan Carlson: loves long walks on the beach<br /></p5>
    </div>
    </div>
  )

  export default App;
