const express = require('express');
const cors = require('cors');
const app = express();
// const morgan = require('morgan');
const { getDatabase } = require('./database/connection.js');
const {
   crearPost,
   eliminarPost,
   modificarPost,
   obtener,
   ObtenerPorID,
} = require('./models/model');

//Middleware
app.use(express.json());
app.use(cors());

const PORT = 3003;

app.listen(PORT, console.log(`Servidor corriendo en puerto, ${PORT}.`));

app.get('/posts', async (req, res) => {
   try {
      const posts = await obtener();
      console.log('posts: ', posts);
      // const respuesta = {
      //    status: 'Con registros',
      //    msg: 'Datos encontrados',
      //    data: posts,
      //    error: false,
      // };
      res.status(200).json({
         posts: posts.length > 0 ? posts : [],
      });
   } catch (error) {
      console.log('Error metodo GET: ', error);
      const respuesta = {
         status: 'Error desconocido',
         msg: 'Error interno desconocido',
         data: [],
         error: false,
      };
      res.status(500).json(respuesta);
   }
});

// app.get('/posts', async (req, res) => {
//    try {
//       const posts = await getDatabase();
//       console.log(posts.length);
//       // console.log('posts:', posts);
//       const respuesta = {
//          status: 'Con registros',
//          msg: 'Datos encontrados',
//          data: posts,
//          error: false,
//       };
//       respuesta.json(posts);
//       res.json({
//          posts: posts.length > 0 ? posts : [],
//       });
//    } catch (error) {
//       console.log('Error al obtener los posts: ', error);
//       const respuesta = {
//          status: 'Error desconocido',
//          msg: 'Error interno desconocido',
//          data: [],
//          error: false,
//       };
//       res.status(500).json(respuesta);
//    }
// });

app.delete('/posts/:id', async (req, res, next) => {
   try {
      const { id } = req.params;
      const postId = +Number.parseInt(id);
      console.log('postId: ', postId);
      if (isNaN(postId)) {
         const respuesta = {
            status: 'Petición incorrecta',
            msg: 'Tipo de dato incorrecto',
            error: true,
         };
         res.status(400).json(respuesta);
      } else {
         const postEliminado = await eliminarPost(postId);
         console.log(postEliminado);
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
      console.log(error);
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
