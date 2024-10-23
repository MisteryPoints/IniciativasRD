 
import axios from 'axios';

interface PromoterProps {
  page?: number;
  id?: number; 
  periodoId?: number;
}

const fetchPromoter = async (params: PromoterProps) => {
  try {
    const response = await axios.get('/api/promoter', {
      params,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default fetchPromoter;