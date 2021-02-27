import firebase from "firebase/app"
const config = {
    apiKey: "AIzaSyCRvS_81tewTVcIsGEbCSnq-J92u8AQIgg",
    authDomain: "insta-chef-ed314.firebaseapp.com",
    databaseURL: "https://insta-chef-ed314-default-rtdb.firebaseio.com",
    projectId: "insta-chef-ed314",
    storageBucket: "insta-chef-ed314.appspot.com",
    messagingSenderId: "940972500996",
    appId: "1:940972500996:web:86de84498555bd4c626d51",
};
firebase.initializeApp(config);
export default firebase;