import './Home.css'
import eggertProfilePhoto from '../../img/eggert.png'
import jonathanProfilePhoto from '../../img/team/jonathan.jpg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faSearch } from "@fortawesome/free-solid-svg-icons";

const Home = () => (
  <div>
    <div className="box-1">
      <h1>INSTA CHEF</h1>
    </div>

    <div className="box-home">
      <h2>About Our Staff:</h2>
      <p> Drake Cote: hates coffee but was a barista<br /></p>
      <p> Solaine Zhao: frolicks through meadows in nature<br /></p>
      <p> Bradley Schulz: was once awake past 1 AM<br /></p>
      <p> Pranav Srinivasan: loves to dunk on Bradley<br /></p>
  
      <div className="board-member-grid">
        <div className="grid-row" id="jonathan">
          <div className="grid-col">
            <div className="profile-img-container">
              <img className="profile-img" src={jonathanProfilePhoto} alt="picture of Jonathan Carlson " />
            </div>
          </div>
          <div className="grid-col">
            <div className="team-member-content">
              <h3> Jonathan Carlson
                <span className="pronouns"> (he/him) </span>
              </h3>
              <p className="team-member-position">
                Developer
              </p>
              <ul>
                <li>
                  <a target="_blank" rel="noopener noreferrer" href="mailto:jonathanbcarlson@gmail.com">
                    {<FontAwesomeIcon icon={faEnvelope} style={{ paddingRight: "5px" }} size="lg" />}
                    jonathanbcarlson@gmail.com</a>
                </li>
                <li>
                  <a target="_blank" rel="noopener noreferrer" href="https://github.com/jonathanbcarlson">
                    <i class="fab fa-github fa-1x" style={{ paddingRight: "5px" }} ></i>
                  jonathanbcarlson</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="personalInfo">
        <img src={jonathanProfilePhoto} width="75px"alt="Jonathan Carlson Profile Image"/>
        <a href="https://jonathanbcarlson.github.io/" >Jonathan Carlson</a>
        <span>: enjoys long walks on the beach<br /></span>
      </div> */}
      <h2>Contact Us!</h2>
      <h>Management:<br /></h>
      <img src={eggertProfilePhoto} width={"300px"} height={"200px"} alt={"Profile Photo of Paul Eggert"}></img>
      <p>Paul Eggert:</p>
      <p>(310) 267-2254</p>
      <p>eggert@cs.ucla.edu</p>
      <p>Fax: (310) 794-5056</p>
    </div>
  </div>
);

export default Home;