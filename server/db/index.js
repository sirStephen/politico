import { Pool } from 'pg';
import { config } from 'dotenv';
import dbConfig from '../../secrets/db_configuration';

config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

console.log('===========================', pool);
console.log('============================', process.env.NODE_ENV);


export default pool;
