 
import axios from 'axios';

interface IniciativasProps {
  page?: number;
  grupo?: number;
  tipo?: boolean;
  perimidas?: boolean;
  keyword?: string;
  periodoId?: number;
}

const fetchIniciativas = async (params: IniciativasProps) => {
  try {
    const response = await axios.get('/api/iniciativas', {
      params,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default fetchIniciativas;