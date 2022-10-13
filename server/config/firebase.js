const { initializeApp } = require("firebase/app");
const keys = require("./keys");

const firebaseConfig = {
  apiKey: keys.firebase.apiKey,
  authDomain: keys.firebase.authDomain,
  projectId: keys.firebase.projectId,
  storageBucket: keys.firebase.storageBucket,
  messagingSenderId: keys.firebase.messagingSenderId,
  appId: keys.firebase.appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

module.exports = app;
