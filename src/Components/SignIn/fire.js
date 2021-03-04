import firebase from 'firebase';


const config = {
  apiKey: "AIzaSyAmtArJokNOa_teGTO7WTV9a4Swcu6Oj5g",
  authDomain: "insta - chef - ba8dc.firebaseapp.com",
  projectId: "insta - chef - ba8dc",
  databaseURL: "https://insta-chef-ba8dc-default-rtdb.firebaseio.com/",
  storageBucket: "insta - chef - ba8dc.appspot.com",
  messagingSenderId: "969126881676",
  appId: "1: 969126881676: web: 33a9b90818260362118ea9"
}

const fire = firebase.initializeApp(config);

export default fire;