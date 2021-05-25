import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const app = firebase.initializeApp({
    apiKey: "AIzaSyDC_hkPKKhq2dl_5gNAZr_ZmVGju7YbJsQ",
    authDomain: "auth-fresh-dish-development.firebaseapp.com",
    projectId: "auth-fresh-dish-development",
    storageBucket: "auth-fresh-dish-development.appspot.com",
    messagingSenderId: "3870442167",
    appId: "1:3870442167:web:437d6d9ae5127c3b39c332"
})

export const auth = app.auth();
export default firebase;