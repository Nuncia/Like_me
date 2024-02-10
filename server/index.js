const express = require('express');
const cors = require('cors');
const app = express();
// const { getDatabase } = require('./database/connection.js');
const {
   crearPost,
   eliminarPost,
   modificarPost,
   obtener,
} = require('./models/model');

//Middleware
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3003;

app.listen(PORT, console.log(`Servidor corriendo en puerto, ${PORT}.`));

app.post('/posts', async (req, res) => {
   try {
      const { titulo, url, descripcion } = req.body;
      console.log(titulo, url, descripcion);
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

app.get('/posts', async (req, res) => {
   try {
      const posts = await obtener();
      res.status(200).json({
         posts: posts.length > 0 ? posts : [],
      });
   } catch (error) {
      const respuesta = {
         status: 'Error desconocido',
         msg: 'Error interno desconocido',
         data: [],
         error: false,
      };
      res.status(500).json(respuesta);
   }
});

app.delete('/posts/:id', async (req, res) => {
   try {
      const { id } = req.params;
      if (isNaN(id)) {
         const respuesta = {
            status: 'Petición incorrecta',
            msg: 'Tipo de dato incorrecto',
            error: true,
         };
         res.status(400).json(respuesta);
      } else {
         const postEliminado = await eliminarPost(id);
         if (postEliminado.rowCount > 0) {
            const resp = {
               status: 'Dato eliminado',
               msg: 'El post fue eliminado con éxito.',
               error: false,
            };
            res.status(200).json(resp);
         } else {
            const resp = {
               status: 'No encontrado',
               msg: 'El post no existe',
               error: false,
            };
            res.status(404).json(resp);
         }
      }
   } catch (error) {
      res.status(500).json({ message: 'Error interno del servidor.' });
   }
});

app.put('/posts/likes/:id', async (req, res) => {
   try {
      const { id } = req.params;
      const post = Number.parseInt(id);
      console.log(post);
      if (isNaN(post)) {
         const respuesta = {
            status: 'Petición incorrecta',
            msg: 'Tipo de dato incorrecto',
            error: true,
         };
         res.status(400).json(respuesta);
      } else {
         const rowsCount = await modificarPost(id);
         if (rowsCount != 0) {
            res.status(200).json({ message: 'Post modificado exitosamente.' });
         } else {
            const respuesta = {
               status: 'No modificado',
               msg: 'El post no fue modificado o no existe.',
               error: true,
            };
            res.status(404).json({
               respuesta,
            });
         }
      }
   } catch (error) {
      console.log('Error en método PUT: ', error),
         res
            .status(500)
            .json({ message: 'Error interno del servidor.', error: error });
   }
});
