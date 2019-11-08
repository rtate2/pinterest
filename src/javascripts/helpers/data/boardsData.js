import axios from 'axios';
// import firebase from 'firebase';
import apiKeys from '../apiKeys.json';

// Step 1:
const baseUrl = apiKeys.firebaseKeys.databaseURL;

// const getCurrentUid = () => firebase.auth().currentUser.uid;

const getBoardsByUid = (uId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="uId"&equalTo="${uId}"`)
    .then((response) => {
      const demBoards = response.data;
      const boards = [];
      Object.keys(demBoards).forEach((fbId) => {
        demBoards[fbId].id = fbId;
        boards.push(demBoards[fbId]);
      });
      resolve(boards); // Hard code to only return one board that comes back
    })
    .catch((error) => reject(error));
});

export default { getBoardsByUid };

// 1. getMachines - returns first machine (hard coding) - DONE
// 2. use machineId to get all positions for that machine - DONE
// 3. use machineId to get all snack positions - DONE
// 4. use uId of snackPositions/positions to get available snacks for that machine
// 5. SMASH EM' - return an array of postiions (in order A1, A2, A3, B1 ...) so positions
// should have position.snack if a snack exists at that posiiton
