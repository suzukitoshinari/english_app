import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/app';

var firebaseConfig = {
  apiKey: "AIzaSyDsCrdfkOeSAUcnfy05BxNBcklFJSlnbqI",
  authDomain: "e-todo-app.firebaseapp.com",
  databaseURL: "https://e-todo-app.firebaseio.com",
  projectId: "e-todo-app",
  storageBucket: "e-todo-app.appspot.com",
  messagingSenderId: "520504304260",
  appId: "1:520504304260:web:f2b449c244d5b32624d8d1",
  measurementId: "G-K189C3ST6E"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

