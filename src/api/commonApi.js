import axios from 'axios';

//Peut contenir des configurations communes à toutes les APIs.
const commonApi = axios.create({
  baseURL: 'https://api.example.com/common',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default commonApi;
