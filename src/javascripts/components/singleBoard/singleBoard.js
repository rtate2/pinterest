import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import utilities from '../../helpers/utilities';
import boardsData from '../../helpers/data/boardsData';

import './singleBoard.scss';
import pins from '../pins/pins';
import pinsData from '../../helpers/data/pinsData';

const deletePinFromBoard = (e) => {
  e.preventDefault();
  const { uId } = firebase.auth().currentUser;
  pinsData.deletePin(e.target.id)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildTheBoard(uId);
      pins.buildThePinsBoard(e.target.dataset.boardid);
    })
    .catch((error) => console.error(error));
};

const displayPinBoards = (e) => {
  const boardId = e.target.id;
  pins.buildThePinsBoard(boardId);
  $('#boards').hide();
  $('#pins').show();
};

const hidePinBoards = () => {
  $('#pins').on('click', '.hide-pins', () => {
    $('#pins').hide();
    $('#boards').show();
  });
};
hidePinBoards();

const buildTheBoard = (uId) => {
  boardsData.getBoardsByUid(uId)
    .then((boards) => {
      let domString = '<h2>Boards</h2>';
      domString += '<div id="boards-section" class="d-flex flex-wrap text-center">';
      boards.forEach((board) => {
        domString += `
          <div class="card ${board.id} main-board" style="width: 18rem;">
            <div class="card-body ${board.uId}">
              <h5 class="card-title">${board.name}</h5>
              <p class="card-text">${board.description}</p>
              <a id="${board.id}" href="#" class="btn btn-primary pin-card">View Pins</a>
            </div>
          </div>
    `;
      });
      domString += '</div>';
      utilities.printToDom('boards', domString);
      $('#boards').on('click', '.pin-card', displayPinBoards);
      $('body').on('click', '.close-pin', deletePinFromBoard);
    })
    .catch((error) => console.error(error));
};

export default { buildTheBoard };
