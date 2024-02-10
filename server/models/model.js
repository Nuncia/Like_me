const { pool } = require('../database/connection');

//Método que obtiene todos los posts
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
//Método que elimina los post
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
         msg: error.message,
      };
      return respuesta;
   }
};

//Método que incrementa los likes
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

module.exports = {
   crearPost,
   modificarPost,
   eliminarPost,
   obtener,
};
