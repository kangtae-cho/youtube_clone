import constant from '../db_constant.json';

import pkg from 'pg';
const { Pool, Client } = pkg;

const pool = new Client({
    user: constant.PG_USER, 
    password: constant.PG_PASSWORD, 
    host: constant.PG_HOST, 
    port: constant.PG_PORT, 
    database: constant.PG_DATABASE
//    max: 20
});


pool.connect();
export default pool;