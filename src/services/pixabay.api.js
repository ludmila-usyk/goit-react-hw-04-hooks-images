import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '23121474-dc8d36b74d53a13d4dcab8680';


axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

const fetchPixabayImgs = async ({ q, page }) => {
  return await axios.get('', { params: { q, page } });
};


// eslint-disable-next-line import/no-anonymous-default-export
export default { fetchPixabayImgs };