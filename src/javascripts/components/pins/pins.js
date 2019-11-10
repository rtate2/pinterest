import pinsData from '../../helpers/data/pinsData';
import utilities from '../../helpers/utilities';

const buildThePinsBoard = (boardId) => {
  pinsData.getPinsByBoardId(boardId)
    .then((pins) => {
      let domString = '<h2>Pins</h2>';
      domString += '<div id="pins-section" class="d-flex flex-wrap text-center">';
      pins.forEach((pin) => {
        domString += `
          <div class="card ${pin.boardId} main-board" style="width: 18rem;">
          <img src="${pin.imageUrl}" class="card-img-top" alt="${pin.name}">
            <div class="card-body ${pin.uId}">
              <h5 class="card-title">${pin.name}</h5>
              <p class="card-text">${pin.description}</p>
              <p class="card-text">${pin.siteUrl}</p>
            </div>
          </div>
    `;
      });
      domString += '</div>';
      utilities.printToDom('pins', domString);
    })
    .catch((error) => console.error(error));
};

export default { buildThePinsBoard };
