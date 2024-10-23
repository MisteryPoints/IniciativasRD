import Image from 'next/image'
import { useState } from 'react'

// ... (previous imports and code)

export const AvatarWithLQIP: React.FC<{ legisladorId: number }> = ({ legisladorId }) => {
  const [isLoading, setIsLoading] = useState(true)
  const highResUrl = `https://www.diputadosrd.gob.do/sil/api/legislador/getfoto/${legisladorId}?periodoId=0`
  
  // Low-quality placeholder (you might want to generate this dynamically)
  const lqipUrl = '@/public/AVATAR.png'

  return (
    <div className="relative h-16 w-16 overflow-hidden rounded-full">
      <Image
        src={lqipUrl}
        alt="Avatar placeholder"
        layout="fill"
        objectFit="cover"
        className={`transition-opacity duration-500 ${isLoading ? 'opacity-100' : 'opacity-0'}`}
      />
      <Image
        src={highResUrl}
        alt="Legislator avatar"
        layout="fill"
        objectFit="cover"
        onLoadingComplete={() => setIsLoading(false)}
        className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
      />
    </div>
  )
}