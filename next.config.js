/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 静的エクスポート（GitHub Pages用）
  images: {
    unoptimized: true, // 静的エクスポート時は必須
  },
};

module.exports = nextConfig;
