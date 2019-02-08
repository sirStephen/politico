import { config } from 'dotenv';

config();
const dbConfig = {};

dbConfig.test = {
  user: process.env.TEST_DB_USER,
  host: process.env.TEST_DB_HOST,
  database: process.env.TEST_DB_NAME,
  port: process.env.TEST_DB_PORT,
};

// export const DATABASE_URL = 'postgres://postgres@localhost:5432/politicaldb',


// // export default dbConfig;

export default config;
