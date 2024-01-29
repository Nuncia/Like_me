const { pool } = require('../database/connection.js');

const obtenerTodosPosts = async () => {
   try {
      const query = 'SELECT * FROM posts';
      console.log(pool);
      const { rows } = await pool.query(query);
      console.log(rows);
   } catch (err) {
      console.log('Error al obtener los posts: ', err);
   }
};

const crearPost = async (post) => {
   try {
      const query =
         'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3,$4)';
      const values = [post.titulo, post.img, post.descripcion, post.likes];
      const { rows } = await pool.query(query, values);
      console.log(rows);
      return rows;
   } catch (error) {
      console.log('Error al crear el post: ', error);
   }
};

obtenerTodosPosts();

module.exports = { obtenerTodosPosts, crearPost };
