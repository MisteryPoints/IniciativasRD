'use client'

import React, { useState } from 'react';

// Función para simplificar la descripción
function simplifyDescription(description: string): string {
  // Eliminar el prefijo común
  const cleanDescription = description.replace(/^(Proyecto de (ley|resolución) (de la Cámara de Diputados |del Senado )?(que |mediante el cual )?)/i, '');

  // Ampliar la lista de verbos para detectar más acciones
  const actionMatch = cleanDescription.match(/\b(establec[e|en|er]|cambi[a|an|ar]|incentiv[a|ar|an]|declar[a|ar|an]|instru[ir|ye|yan]|modific[a|ar|an]|design[a|ar|an]|construy[a|ar|an]|prote[ge|ger|en]|foment[ar|e|an]|cre[a|ar|an]|reconoc[er|e|en]|otorg[a|ar|an])\b/i);
  const action = actionMatch ? actionMatch[0] : '';

  // Excluir frases como "Al presidente de la República" y similares
  const unwantedPhrases = /(al presidente de la república|a la presidenta del senado|al ministro de[^,]+|al director de[^,]+|al congreso nacional)/i;
  const cleanObjectPart = cleanDescription.replace(unwantedPhrases, '').trim();

  // Modificar para permitir objetos que incluyan números de ley con puntos y guiones
  const objectMatch = cleanObjectPart.match(new RegExp(`${action}\\s+([^\\.,\\(]+?(\\bLey\\sNo\\.\\d{1,}-\\d{1,}\\b)?(\\s*(\\d{1,2}\\s+de\\s+[a-z]+\\s+de\\s+\\d{4}))?[^\\(]*)`, 'i'));
  
  const object = objectMatch ? objectMatch[1].trim() : '';

  // Combinar acción y objeto
  let simplified = `${action} ${object}`.trim();

  // Verificaciones de depuración
  console.log({ action, object, simplified, cleanObjectPart });

  // Si la descripción simplificada es demasiado corta, usar una parte más larga del original
  if (simplified.length < 30 && cleanObjectPart.length > 105) {
    simplified = cleanObjectPart.slice(0, 105).trim() + '...';
  }

  return simplified.charAt(0).toUpperCase() + simplified.slice(1);
}


interface DescriptionProps {
  fullDescription: string;
}

const SimplifiedDescription: React.FC<DescriptionProps> = ({ fullDescription }) => {
  const [showFull, setShowFull] = useState(false);
  const simplifiedDesc = simplifyDescription(fullDescription);

  return (
    <div>
      <p className="text-lg font-semibold mb-2">
        {showFull ? fullDescription : simplifiedDesc}
      </p>
      <button
        onClick={() => setShowFull(!showFull)}
        className="text-sm text-blue-600 hover:underline focus:outline-none"
      >
        {showFull ? 'Ver versión corta' : 'Ver descripción completa'}
      </button>
    </div>
  );
};

export default SimplifiedDescription;
