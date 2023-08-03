/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode : true,
  swcMinify: true,
  cleanUrls:true,
  output:'export',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
