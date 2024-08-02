import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wilsonatm.altuori.com',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default withPWA({
  dest: 'public',
  disable: false,
})(nextConfig);
