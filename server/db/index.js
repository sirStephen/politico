import { Pool } from 'pg';
import { config } from 'dotenv';
// import dbConfig from '../../secrets/db_configuration';

config();

const connectionString = process.env.LOCAL_DATABASE_URL || process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
});

console.log('===========================', pool);
console.log('============================', process.env.NODE_ENV);

export default pool;
