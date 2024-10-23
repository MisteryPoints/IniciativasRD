 
import axios from 'axios';

interface DocsProps {
  page?: number;
  id?: number; 
  periodoId?: number;
}

const fetchDocs = async (params: DocsProps) => {
  try {
    const response = await axios.get('/api/docs', {
      params,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default fetchDocs;