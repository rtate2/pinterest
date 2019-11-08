import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getUsers = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users.json`)
    .then((response) => {
      const demUsers = response.data;
      const users = [];
      Object.keys(demUsers).forEach((fbId) => {
        demUsers[fbId].id = fbId;
        users.push(demUsers[fbId]);
      });
      resolve(users[0]);
    })
    .catch((error) => reject(error));
});

export default { getUsers };
