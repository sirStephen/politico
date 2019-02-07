import { config } from 'dotenv';

config();
const dbConfig = {};

dbConfig.test = {
  user: process.env.TEST_DB_USER,
  host: process.env.TEST_DB_HOST,
  database: process.env.TEST_DB_NAME,
  port: process.env.TEST_DB_PORT,
};

dbConfig.local = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
};

export default dbConfig;
// import url from 'url';
// import dotenv from 'dotenv';

// dotenv.config();

// const params = url.parse(process.env.DATABASE_URL);
// const auth = params.auth.split(':');

// const config = {
//   user: auth[0],
//   host: params.hostname,
//   port: params.port,
//   database: params.pathname.split('/')[1],
//   ssl: true,
// };

// export default config;
