const { pool } = require('../database/connection');

const obtener = async () => {
   try {
      const consulta = 'select * from posts order by id';
      const result = await pool.query(consulta);
      console.log(result.rows);
      return result.rows;
   } catch (error) {
      console.log('Error en Obtener: ', error);
      throw new Error(error);
   }
};

const ObtenerPorID = async (id) => {
   try {
      const consulta = 'SELECT * FROM posts WHERE id = $1';
      const values = [id];
      const { rows } = await pool.query(consulta, values);
      console.log(rows);
      return rows;
   } catch (error) {
      console.log('ObtenerPorID: ', error);
   }
};

const crearPost = async (post) => {
   try {
      const query =
         'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3,$4) RETURNING *';
      const values = [post.titulo, post.url, post.descripcion, 0];
      const { rowCount, rows } = await pool.query(query, values);
      return rows;
   } catch (error) {
      console.log(error);
      throw new Error(error);
   }
};

const eliminarPost = async (id) => {
   try {
      const consulta = 'DELETE FROM posts WHERE id = $1 RETURNING *';
      const values = [id];
      const { rowCount } = await pool.query(consulta, values);
      const respuesta = {
         rowCount: rowCount,
         msg: '',
      };
      return respuesta;
   } catch (error) {
      const respuesta = {
         rowCount: 0,
         msg: error,
      };
      return respuesta;
   }
};

const modificarPost = async (id) => {
   try {
      const consulta =
         'UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *';
      const values = [id];
      const { rowCount } = await pool.query(consulta, values);
      console.log(rowCount);
      return rowCount;
   } catch (error) {
      throw new Error(error);
   }
};
// eliminarPost(123);

module.exports = {
   crearPost,
   modificarPost,
   eliminarPost,
   obtener,
   ObtenerPorID,
};
