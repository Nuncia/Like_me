const pk = require('pg');
require('dotenv').config();
// import dotenv from 'dotenv/config';

const { Pool } = pk;

const pool = new Pool({
   user: 'postgres',
   host: 'localhost',
   database: 'likeme',
   password: '',
   port: 5433,
   allowExitOnIdle: true,
});

const getDatabase = async () => {
   try {
      const { rows } = await pool.query('SELECT * FROM posts');
      console.log('Base de datos conectada', rows);
   } catch (error) {
      console.log('Error al conectarse a la base de datos', error);
   }
};

// getDatabase();

// module.exports = pool;
