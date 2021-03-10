import image from "../../img/eggert.jpeg"

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
      <p> Jonathan Carlson: loves long walks on the beach<br /></p>
      <h2>Contact Us!</h2>
      <h>Management:<br /></h>
      <img src={image}></img>
      <p>Paul Eggert:</p>
      <p>(310) 267-2254</p>
      <p>eggert@cs.ucla.edu</p>
      <p>Fax: (310) 794-5056</p>
    </div>
  </div>
)

export default Home;