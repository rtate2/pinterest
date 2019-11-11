import $ from 'jquery';
import utilities from '../../helpers/utilities';
import boardsData from '../../helpers/data/boardsData';

import './singleBoard.scss';
import pins from '../pins/pins';

const displayPinBoards = (e) => {
  const boardId = e.target.id;
  pins.buildThePinsBoard(boardId);
  $('#boards').hide();
  $('#pins').show();
};

const hidePinBoards = () => {
  $('#pins').on('click', '.hide-pins', () => {
    console.log('Hey Little Fella');
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
    })
    .catch((error) => console.error(error));
};

export default { buildTheBoard };
