const express = require('express');
const cors = require('cors');
const app = express();

const {
   obtenerTodosPosts,
   crearPost,
   eliminarPost,
   modificarPost,
} = require('./models/model.js');

//Middleware
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

app.listen(PORT, console.log('Servidor corriendo en puerto, 3001.'));

app.get('/posts', async (req, res) => {
   try {
      const posts = await obtenerTodosPosts();
      // console.log('posts:', posts);
      const respuesta = {
         status: 'Con registros',
         msg: 'Datos encontrados',
         data: posts,
         error: false,
      };
      res.json({
         posts: posts.length > 0 ? posts : [],
      });
   } catch (error) {
      // console.log('Error al obtener los posts: ', error);
      const respuesta = {
         status: 'Error desconocido',
         msg: 'Error interno desconocido',
         data: [],
         error: false,
      };
      res.status(500).json(respuesta);
   }
});

app.post('/posts', async (req, res) => {
   try {
      const { titulo, url, descripcion } = req.body;
      if (!titulo || !url || !descripcion) {
         const respuesta = {
            status: 'Faltan datos',
            msg: 'Todos los campos son requeridos.',
            error: true,
         };
         res.json({
            respuesta,
         });
      } else {
         const post = { titulo, url, descripcion };
         const nuevoPost = await crearPost(post);
         const respuesta = {
            status: 'Registro creado',
            msg: 'Registro creado con éxito.',
            error: false,
         };
         res.json({
            respuesta,
         });
      }
   } catch (error) {
      console.log('Error al crear el post: ', error);
      return res.status(500).json({ message: 'Error interno del servidor.' });
   }
});

app.delete('/posts/:id', async (req, res) => {
   const { id } = req.params;
   await eliminarPost(id);
   res.send('Post eliminado con éxito');
});

app.put('/posts/:id', async (req, res) => {
   try {
      const { id } = req.params;
      console.log(id);
      console.log('req.body: ', req.body);
      const { titulo, img, descripcion } = req.body;
      const posts = await modificarPost(titulo, img, descripcion, id);
      res.status(200).json({ message: 'Post modificado exitosamente.' });
   } catch (error) {
      console.log('Error en metodo PUT: ', error),
         res.status(500).json({ message: 'Error interno del servidor.' });
   }
});

app.put('/posts/likes/');
