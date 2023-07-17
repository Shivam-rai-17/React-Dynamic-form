import { fetchData } from '../utils/apiUtils';

export const getData = async () => {
  try {
    const response = await fetchData('http://localhost:5000/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
