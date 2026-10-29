/** @type {import('next').Config} */
const nextConfig = {
  // اضافه کردن این بخش برای اجازه دادن به IP شبکه محلی
  allowedDevOrigins: ['172.20.10.6', 'localhost:3000'],
};

module.exports = nextConfig;