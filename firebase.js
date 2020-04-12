import * as firebase from "firebase/app";
import "firebase/analytics";

// Your web app's Firebase configuration
var config = {
  apiKey: "AIzaSyD6P96YN8-CEBDnQtPLuasUtnDc9OXwq9o",
  authDomain: "pova-aa286.firebaseapp.com",
  databaseURL: "https://pova-aa286.firebaseio.com",
  projectId: "pova-aa286",
  storageBucket: "pova-aa286.appspot.com",
  messagingSenderId: "867544538915",
  appId: "1:867544538915:web:0e3d6006d5834aea7f7696",
  measurementId: "G-50VJV3FN92"
};
// Initialize Firebase

try {
  firebase.initializeApp(config)
  console.log('success');

} catch (erro) {

}
export default firebase