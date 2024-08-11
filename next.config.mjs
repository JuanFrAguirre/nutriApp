/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'prod-mercadona.imgix.net',
        protocol: 'https',
      },
      {
        hostname: 'static.carrefour.es',
        protocol: 'https',
      },
      {
        hostname: 'www.compraonline.alcampo.es',
        protocol: 'https',
      },
      {
        hostname: 'lh3.googleusercontent.com',
        protocol: 'https',
      },
      {
        hostname: 'avatars.githubusercontent.com',
        protocol: 'https',
      },
    ],
  },
};

export default nextConfig;
