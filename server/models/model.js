const pool = require('../database/connection.js');

const obtenerTodosPosts = async () => {
   try {
      const consulta = 'SELECT * FROM posts';
      const pools = await pool.query(consulta);
      return pools.rows;
   } catch (err) {
      console.log('Error al obtener los posts: ', err);
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

const modificarPost = async (titulo, url, descripcion, id) => {
   console.log(url);
   const consulta =
      'UPDATE posts SET titulo = $1, img = $2, descripcion = $3 WHERE id = $4';
   const values = [titulo, url, descripcion, id];
   const resultados = await pool.query(consulta, values);
   console.log(resultados);
   return resultados;
};

obtenerTodosPosts();
// modificarPost('Uno', 'https://placedog.net/500/200', 'Uno', 123);
