import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '31108822-76837894c66e615f3880fb969';

export const getImages = async (page, searchQuery) => {
  const response = await axios.get(
    `?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  // console.log(response);
  if (response.status === 200) {
    return response.data;
  }
};
