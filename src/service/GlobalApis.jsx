// globalApi.jsx
import axios from 'axios';

const apiKey = '*****************************'; // Replace with your actual API key

export const fetchImages = async (query) => {
  const url = `https://api.pexels.com/v1/search?query=${query}&per_page=5`;
  
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: apiKey,
      },
    });
    return response.data.photos; // Returns an array of photo objects
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
};
