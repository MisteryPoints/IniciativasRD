 
import axios from 'axios';

interface GruposProps { 
  periodoId?: number;
}

const fetchGrupos = async (params: GruposProps) => {
  try {
    const response = await axios.get('/api/grupos', {
      params,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default fetchGrupos;