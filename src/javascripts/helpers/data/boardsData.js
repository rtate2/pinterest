import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getBoardsByUid = (uId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="uId"&equalTo="${uId}"`)
    .then((response) => {
      const demBoards = response.data;
      const boards = [];
      Object.keys(demBoards).forEach((fbId) => {
        demBoards[fbId].id = fbId;
        boards.push(demBoards[fbId]);
      });
      resolve(boards);
    })
    .catch((error) => reject(error));
});

const deleteBoard = (id) => axios.delete(`${baseUrl}/boards/${id}.json`);

const createBoard = (newBoard) => axios.post(`${baseUrl}/boards.json`, newBoard);

export default { getBoardsByUid, deleteBoard, createBoard };
