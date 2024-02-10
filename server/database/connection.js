const pk = require('pg');
require('dotenv').config();
// import dotenv from 'dotenv/config';

const { Pool } = pk;

const pool = new Pool({
   user: process.env.DB_USER,
   host: process.env.DB_HOST,
   database: process.env.DB_DATABASE,
   password: process.env.DB_PASSWORD,
   port: process.env.DB_PORT,
   allowExitOnIdle: true,
});

const getDatabase = async () => {
   try {
      const { rowCount, rows } = await pool.query(
         'SELECT * FROM posts ORDER BY id'
      );
      console.log('Base de datos conectada', rows, rowCount);
      return rows;
   } catch (error) {
      console.log('Error al conectarse a la base de datos', error);
   }
};

// getDatabase();
module.exports = { pool, getDatabase };
