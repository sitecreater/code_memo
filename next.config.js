const dotenv = require("dotenv");

// 환경 파일 로드
const path = process.env.NODE_ENV === "production" ? ".env.prod" : ".env.local";
dotenv.config({ path });

console.log("Loaded Environment File:", path);

// Next.js 설정
module.exports = {
  reactStrictMode: true,
  env: {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DATABASE_URL: process.env.DATABASE_URL,
  },
};
