import './Home.css';
import TeamProfile from './TeamProfile'

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
      {/* <p> Drake Cote: hates coffee but was a barista<br /></p>
      <p> Solaine Zhao: frolicks through meadows in nature<br /></p>
      <p> Bradley Schulz: was once awake past 1 AM<br /></p>
      <p> Pranav Srinivasan: loves to dunk on Bradley<br /></p> */}
  
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
        <h2>Contact Us!</h2>
        <h>Management:<br /></h>
        <img src={eggertProfilePhoto} width={"300px"} height={"200px"} alt={"Profile Photo of Paul Eggert"}></img>
        <p>Paul Eggert:</p>
        <p>(310) 267-2254</p>
        <p>eggert@cs.ucla.edu</p>
        <p>Fax: (310) 794-5056</p>
      </div>
    </div>
  </div>
);

export default Home;