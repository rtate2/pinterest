import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import singleBoard from '../../components/singleBoard/singleBoard';

const authDiv = $('#auth');
const boardsDiv = $('#boards');
const logoutNavbar = $('#navbar-button-logout');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // someone is logged in - we should NOT see auth componenet
      boardsDiv.removeClass('hide');
      logoutNavbar.removeClass('hide');
      authDiv.addClass('hide');
      singleBoard.buildTheBoard(user.uid);
    } else {
      // nobdy logged in SHOW auth component
      boardsDiv.addClass('hide');
      logoutNavbar.addClass('hide');
      authDiv.removeClass('hide');
    }
  });
};

export default { checkLoginStatus };
