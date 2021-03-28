import './Home.css';
import TeamProfile from './TeamProfile'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone} from "@fortawesome/free-solid-svg-icons";

import eggertProfilePhoto from '../../img/eggert.png';
import jonathanProfilePhoto from '../../img/team/jonathanProfilePhoto.jpg';
import pranavProfilePhoto from '../../img/team/pranavProfilePhoto.jpg';
import solaineProfilePhoto from '../../img/team/solaineProfilePhoto.jpg';
import bradleyProfilePhoto from '../../img/team/bradleyProfilePhoto.jpg';

const Home = () => (
  <div>
    <div className="box-1">
      <h1>INSTA CHEF</h1>
    </div>

    <div className="box-home">
      <h2>Our Team:</h2>
      <div className="member-grid">
        <TeamProfile 
          id="jonathan" 
          profileImgSrc={jonathanProfilePhoto}
          imgAlt="picture of Jonathan Carlson" 
          name="Jonathan Carlson"
          pronouns="he/him"
          memberPosition="Developer"
          email="jonathanbcarlson@gmail.com"
          githubUsername="jonathanbcarlson"
          linkedinUsername="jonathanbcarlson"
        />

        <TeamProfile 
          id="pranav"
          profileImgSrc={pranavProfilePhoto}
          imgAlt="picture of Pranav Srinivasan"
          name="Pranav Srinivasan"
          pronouns=""
          memberPosition="Developer"
          email="pranavsankars@g.ucla.edu"
          githubUsername="pranavs2001"
          linkedinUsername="pranavsankars"
        />

        <TeamProfile
          id="solaine"
          profileImgSrc={solaineProfilePhoto}
          imgAlt="picture of Solaine Zhao"
          name="Solaine Zhao"
          pronouns=""
          memberPosition="Developer"
          email="solainezh2019@gmail.com"
          githubUsername="solainezhao"
          linkedinUsername="solaine-zhao-5aa04a1b1"
        />
          
        <TeamProfile 
          id="bradley"
          profileImgSrc={bradleyProfilePhoto}
          imgAlt="picture of Bradley Schulz"
          name="Bradley Schulz"
          pronouns=""
          memberPosition="Developer"
          email="bschulz267@ucla.edu"
          githubUsername="bschulz01"
          linkedinUsername="bradley-schulz"
        />

        <TeamProfile
          id="drake"
          profileImgSrc={""}
          imgAlt="picture of Drake Cote"
          name="Drake Cote"
          pronouns=""
          memberPosition="Developer"
          email="drakecote@g.ucla.edu"
          githubUsername="drakecote"
          linkedinUsername=""
        />

      </div>

      <div class="management">
        {/* <h2>Contact Us!</h2> */}
        <h>Contact our Management:<br /></h>
        <img src={eggertProfilePhoto} width={"300px"} height={"200px"} alt={"Profile Photo of Paul Eggert"}></img>
        <h3>Paul Eggert:</h3>
        <ul class="profile-link-list">
          <li>
            <p> {<FontAwesomeIcon icon={faPhone} style={{ paddingRight: "5px" }}/>} (310) 267-2254</p>
          </li>
          <li>
            <a target="_blank" rel="noopener noreferrer" class="profile-link" href={"https://github.com/eggert"}>
              <i class="fab fa-github fa-1x" style={{ paddingRight: "5px" }} ></i>
              {"eggert"}
            </a>
          </li>
          <li>
            <a target="_blank" rel="noopener noreferrer" class="profile-link" href={"mailto:eggert@cs.ucla.edu"}>
              {<FontAwesomeIcon icon={faEnvelope} style={{ paddingRight: "5px" }} size="lg" />}
              {"eggert@cs.ucla.edu"}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default Home;