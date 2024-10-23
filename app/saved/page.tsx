'use client' 
import React, { useState, useEffect } from 'react';
import fetchGrupos from '@/components/GruposFetch' 
import { GruposPaginationState, GruposType, GruposCardProps } from '@/components/types';  
import Link from 'next/link'; 

const GrupoButton: React.FC<GruposCardProps> = ({ grupo, tipo }) => {  
  return (
    <Link href={`/iniciativas?grupo=${grupo.id}&tipo=${tipo}`} passHref>
      <button  
        className="block bg-white shadow-md rounded-lg p-6 mb-4 w-full text-left hover:bg-gray-100 transition-colors"
      > 
        <p className="text-gray-600">{grupo.descripcion}</p>
      </button>
    </Link>
  );
};

export default function Home() {
  const [grupos, setGrupos] = useState<GruposType[]>([]);
  const [tipo, setTipo] = useState<boolean>(false);

  useEffect(() => {  
    const param: GruposPaginationState = { periodoId: 0 }
    const handleFetchGrupos = async () => {   
      const data = await fetchGrupos(param);
      setGrupos(data); 
    };
    handleFetchGrupos();
  }, [tipo]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Grupos</h1>

      {/* Type Toggle Button Group */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium border border-gray-200 rounded-l-lg ${
              !tipo
                ? 'bg-blue-700 text-white hover:bg-blue-800'
                : 'bg-white text-gray-900 hover:bg-gray-100'
            }`}
            onClick={() => setTipo(false)}
          >
            Resolución
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium border border-gray-200 rounded-r-lg ${
              tipo
                ? 'bg-blue-700 text-white hover:bg-blue-800'
                : 'bg-white text-gray-900 hover:bg-gray-100'
            }`}
            onClick={() => setTipo(true)}
          >
            Proyecto de Ley
          </button>
        </div>
      </div>


      {grupos.map(grupo => (
        <GrupoButton key={grupo.id} grupo={grupo} tipo={tipo} />
      ))}
    </div>
  );
}



