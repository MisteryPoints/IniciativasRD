'use client'
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import fetchIniciativas from '@/components/IniciativaFetch'
import IniciativaCard from '@/components/IniciativaCard';
import { InitiativeType, InitiativePaginationState } from '@/components/types'; 

export default function Home() { 
  const searchParams = useSearchParams();

  const [iniciativas, setIniciativas] = useState<InitiativeType>({
    page: 1,
    pageSize: 10,
    total: 0,
    results: []
  });
  const [pagination, setPagination] = useState<InitiativePaginationState>({
    page: 1,
    grupo: 1,
    tipo: undefined,
    perimidas: false,
    keyword: '',
    periodoId: 0,
  }); 

  useEffect(() => {
    const grupo = searchParams.get('grupo');
    const tipo = searchParams.get('tipo'); 
    
    const newPagination = { ...pagination };
    if (grupo) newPagination.grupo = Number(grupo);
    if (tipo !== null) newPagination.tipo = tipo === 'true';

    setPagination(newPagination);

    const handleFetchIniciativas = async () => {   
      const data = await fetchIniciativas(newPagination);
      setIniciativas(data); 
    };
    handleFetchIniciativas();
  }, [searchParams]); // Only depend on searchParams

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    fetchIniciativas({ ...pagination, page: newPage }).then(setIniciativas);
  };

  return (
    <div>
      {/* Render your initiatives data */} 
      <div className="max-w-4xl mx-auto p-4"> 
      {/* Card */}
      {iniciativas.results.map(iniciativa => ( 
        <IniciativaCard key={iniciativa.id} iniciativa={iniciativa} />  
      ))}
      </div>  
      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button 
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={() => handlePageChange(pagination.page - 1)}
          disabled={pagination.page <= 1}
        >
          Previous Page
        </button>
        
        <div className="flex items-center">
          <span className="text-sm text-gray-600 mr-2">Page:</span>
          <select 
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            value={pagination.page}
            onChange={(e) => handlePageChange(parseInt(e.target.value))}
          > 
            {Array.from({ length: Math.ceil(iniciativas.total / 10) }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
    
        <button 
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={() => handlePageChange(pagination.page + 1)}
          disabled={pagination.page >= Math.ceil(iniciativas.total / 10)}
        >
          Next Page
        </button>
      </div>
    </div>    
  );
}