const { pool, getDatabase } = require('../database/connection');

// const obtener = async () => {
//    try {
//       const consulta = 'select * from posts order by id';
//       const result = await pool.query(consulta);
//       return result.rows;
//    } catch (error) {
//       console.log('Error en Obtener: ', error);
//    }
// };
// const obtenerTodosPosts = async () => {
//    try {
//       const consulta = 'SELECT * FROM posts ORDER BY id';
//       console.log(consulta);
//       const result = await pool.query(consulta);
//       // console.log('ROWS', pools.rowCount, pools.rows);
//       return result.rows;
//    } catch (err) {
//       console.log('Error al obtener los posts: ', err);
//    }
// };

const crearPost = async (post) => {
   try {
      const query =
         'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3,$4) RETURNING *';
      const values = [post.titulo, post.url, post.descripcion, 0];
      const { rowCount, rows } = await pool.query(query, values);
      return rows;
   } catch (error) {
      throw new Error(error);
   }
};

const eliminarPost = async (id) => {
   try {
      console.log(id);
      const consulta = 'DELETE FROM posts WHERE id = $1 RETURNING *';
      const values = [id];
      await pool.query(consulta, values);
   } catch (error) {
      console.log(error);
   }
};

const modificarPost = async (id) => {
   try {
      const consulta = 'UPDATE posts SET likes = likes + 1 WHERE id = $1';
      const values = [id];
      const resultados = await pool.query(consulta, values);
      console.log(resultados);
      return resultados;
   } catch (error) {
      throw new Error(error);
   }
};

// modificarPost(131);

module.exports = { crearPost, modificarPost, eliminarPost };
