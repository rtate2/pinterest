import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

import auth from './googleSignIn.png';
import utilities from '../../helpers/utilities';

const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const loginButton = () => {
  const domString = `<button id="google-auth">
    <img src=${auth} />
  </button>`;

  utilities.printToDom('auth', domString);
  $('#google-auth').click(signMeIn);
};

export default { loginButton };
