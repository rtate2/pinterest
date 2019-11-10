import 'bootstrap';
import firebase from 'firebase';
import apiKeys from './helpers/apiKeys.json';

import auth from './components/Auth/auth';
import myNavbar from './components/myNavbar/myNavbar';
import authData from './helpers/data/authData';
import pinsData from './helpers/data/pinsData';

import '../styles/main.scss';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  auth.loginButton();
  myNavbar.logoutEvent();
  authData.checkLoginStatus();
  pinsData.getPinsByBoardId();
};

init();
