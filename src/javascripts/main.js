import 'bootstrap';
import firebase from 'firebase';
import apiKeys from './helpers/apiKeys.json';

import auth from './components/Auth/auth';
import myNavbar from './components/myNavbar/myNavbar';
import authData from './helpers/data/authData';
import boardsData from './helpers/data/boardsData';

import '../styles/main.scss';
// import singleBoard from './components/singleBoard/singleBoard';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  auth.loginButton();
  myNavbar.logoutEvent();
  authData.checkLoginStatus();
  boardsData.getBoardsByUid();
  // singleBoard.buildTheBoard();
};

init();
