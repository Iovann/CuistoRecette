import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD6sVfXw7g2cTf4jyk4baCWNtehUyQZ37o",
  authDomain: "cuistorecette-bb8ef.firebaseapp.com",
  projectId: "cuistorecette-bb8ef",
  storageBucket: "cuistorecette-bb8ef.appspot.com",
  messagingSenderId: "1074793566865",
  appId: "1:1074793566865:web:fd37a3a25d3cf53db4a530"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
