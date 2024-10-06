/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md/,
      type: "asset/source",
    });
    return config;
  },
};

module.exports = nextConfig;
