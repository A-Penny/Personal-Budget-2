const { Pool } = require('pg');


const pool = new Pool ({
  user: 'me',
  host: 'localhost',
  database: 'budget',
  password: 'password',
  port: 5432
});


/*
//For production...
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

const connectionString = 
`postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: {
    rejectUnauthorized: false,
  }
});
*/

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}