const axios = require('axios');
const { PAPAGO_CLIENT_ID, PAPAGO_CLIENT_SECRET } = require('./config.json');

const api = axios.create({
  baseURL: 'https://openapi.naver.com/v1/',
  headers: {
    'X-Naver-Client-Id': PAPAGO_CLIENT_ID,
    'X-Naver-Client-Secret': PAPAGO_CLIENT_SECRET,
  },
});

const papagoApi = {
  detectLangs: (query) => api.post('papago/detectLangs', { query }),
  // 시작언어 끝언어 text
  translator: (start, end, text) =>
    api.post('papago/n2mt', { source: start, target: end, text: text }),
};

module.exports = { papagoApi };
