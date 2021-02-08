import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyD-wpEWOcBwr7MK706PFMeLFBKB-h2ilV8",
    authDomain: "realestate-303416.firebaseapp.com",
    databaseURL: "https://realestate-303416-default-rtdb.firebaseio.com",
    projectId: "realestate-303416",
    storageBucket: "realestate-303416.appspot.com",
    messagingSenderId: "692802073731",
    appId: "1:692802073731:web:1a34c57dfcfe073173d7b6"
}

firebase.initializeApp(config);

export default firebase