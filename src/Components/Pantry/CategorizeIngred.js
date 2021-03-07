import fire from '../SignIn/fire';
import "firebase/database";

function CategorizeIngred(key, uid) {
  let category = "";
  let pantryRef = fire.database().ref(uid + '/pantryItems/' + key.toString());
  let categoriesForIngred = pantryRef.child('category');
  categoriesForIngred.on('value', (snapshot) => {
    category = snapshot.val();
  })
  return category;
}

export default CategorizeIngred;