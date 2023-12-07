/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/tailwind-gallery",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
