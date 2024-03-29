/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hsi-sandbox.vercel.app',
        port: '',
        pathname: '/image/**',
      },
    ]
  }
}

module.exports = nextConfig
