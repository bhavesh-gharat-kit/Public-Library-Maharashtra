/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   serverExternalPackages: ['pdfjs-dist'],
  // },
  webpack(config) {
    config.module.rules.push({
      test: /pdf\.worker\.min\.mjs$/,
      type: "asset/resource",
    });
    return config;
  },
};

export default nextConfig;
