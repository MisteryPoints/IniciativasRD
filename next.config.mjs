/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.diputadosrd.gob.do',
        port: '',
        pathname: '/sil/api/**',
      },
    ],
  },
};

export default nextConfig;
