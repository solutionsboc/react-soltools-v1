import axios from 'axios';
import {decode as base64_decode, encode as base64_encode} from 'base-64';
// const BASE_URL = 'https://cors-anywhere.herokuapp.com/http://localhost:8080/ADOweb/rest/2.0/repos';
const BASE_URL = 'http://localhost:8080/ADOweb/rest/2.0/repos';
// const BASE_URL = 'ADOweb/rest/2.0/repos';
const AUTH_STRING = 'dak:Password123';

export default axios.create({
  baseURL: BASE_URL,
  // baseURL: 'https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=5&country=it&f_has_lyrics=1&apikey=your_api_key',
  headers: {
    'Authorization':'Basic ZGFrOlBhc3N3b3JkMTIz',
    // 'Authorization':base64_encode(AUTH_STRING),
    'Accept':'*/*',
    "X-Requested-With": "XMLHttpRequest",
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  },
  withCredentials: true
});