import utilities from '../../helpers/utilities';
import boardsData from '../../helpers/data/boardsData';

import './singleBoard.scss';

// const uId = boardsData.getCurrentUid();

const buildTheBoard = () => {
  boardsData.getBoardsByUid()
    .then((boards) => {
      let domString = '<h2>Pinterest</h2>';
      domString += '<div id="boards-section" class"d-flex flex-wrap">';
      boards.forEach((board) => {
        domString += 'some info here';
      });
      domString += '</div>';
      utilities.printToDom('', domString);
    })
    .catch((error) => console.error(error));
};

export default { buildTheBoard };

// const buildTheMachine = () => {
//   smash.getCompleteMachine()
//     .then((positions) => {
//       let domString = '<h2>VENDING MACHINE</h2>';
//       domString += '<div id="snack-section" class="d-flex flex-wrap">';
//       positions.forEach((position) => {
//         domString += snacks.makeASnack(position);
//       });
//       domString += '</div>';
//       utilities.printToDom('machine', domString);
//       $('#machine').on('click', '.buy-snack', buySnack);
//     })
//     .catch((error) => console.error(error));
// };

// export default { buildTheMachine };

// Boards const boardsComponent = () => {
//   const domString = '<h1>Boards</h1>';

//   utilities.printToDom('boards', domString);
// };

// export default { boardsComponent };
