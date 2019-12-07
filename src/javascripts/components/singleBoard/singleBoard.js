import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import utilities from '../../helpers/utilities';
import boardsData from '../../helpers/data/boardsData';

import './singleBoard.scss';
import pins from '../pins/pins';
import pinsData from '../../helpers/data/pinsData';

const createNewBoard = (e) => {
  e.stopImmediatePropagation();
  const { uid } = firebase.auth().currentUser;
  const newBoard = {
    name: $('#board-name').val(),
    uid,
    isPrivate: true,
    description: $('#board-description').val(),
  };
  boardsData.createBoard(newBoard)
    .then(() => {
      $('#exampleModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      buildTheBoard(uid);
    })
    .catch((error) => console.error(error));
};

const removeBoard = (e) => {
  const { uid } = firebase.auth().currentUser;
  e.preventDefault();
  pinsData.deletePin(e.target.dataset.boardid);
  boardsData.deleteBoard(e.target.id)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildTheBoard(uid);
    })
    .catch((error) => console.error(error));
};

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
      domString += '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Create New Board</button>';
      domString += '<div id="boards-section" class="d-flex flex-wrap text-center">';
      boards.forEach((board) => {
        domString += `
          <div class="card ${board.id} main-board" style="width: 18rem;">
          <button type="button" class="delete-board d-flex justify-content-end" data-boardID="${board.boardId}"  id="${board.id}" aria-label="Close">x 
          </button>
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
      $('body').on('click', '.delete-board', removeBoard);
      $('body').on('click', '#add-board', createNewBoard);
    })
    .catch((error) => console.error(error));
};

export default { buildTheBoard };
