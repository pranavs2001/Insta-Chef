import fire from '../SignIn/fire';
import "firebase/database";

function SearchWithPantryIngred(key, uid) {
  console.log('key is: ', key.toString());
  let pantryRef = fire.database().ref(uid + '/pantryItems');
  let itemsInFire = pantryRef.orderByChild('items')
  itemsInFire.on('value', (snapshot) => {
    console.log('snapshot is: ', snapshot);
    // loop through firebase
    snapshot.forEach((childSnapshot) => {
      console.log('childSnapshot val is: ', childSnapshot.val());
    })
  console.log('pantryRef is: ', pantryRef);
  pantryRef.on('value', (snapshot) => {
    const data = snapshot.val()
    console.log('data is: ', data);
  })})
}

export default SearchWithPantryIngred;