'use client'

import React, { useState } from 'react';

// Función para simplificar la descripción
function simplifyDescription(description: string): string {
  // Eliminar el prefijo común
  const cleanDescription = description.replace(/^(Proyecto de (ley|resolución) (de la Cámara de Diputados |del Senado )?(que |mediante el cual )?)/i, '');

  // Extraer la acción principal
  const actionMatch = cleanDescription.match(/^(\w+)/);
  const action = actionMatch ? actionMatch[1] : '';

  // Extraer el objeto de la acción
  const objectMatch = cleanDescription.match(/(?:al?|el|la|los|las) ([^,\.]+)/);
  const object = objectMatch ? objectMatch[1] : '';

  // Combinar acción y objeto
  let simplified = `${action} ${object}`.trim();

  // Si la descripción simplificada es demasiado corta, usar una parte más larga del original
  if (simplified.length < 30 && cleanDescription.length > 50) {
    simplified = cleanDescription.slice(0, 50).trim() + '...';
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