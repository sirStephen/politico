import { Pool } from 'pg';

import {
  user, host, database, port,
} from '../../secrets/db_configuration';

const pool = new Pool({
  user, host, database, port,
});

export default pool;
