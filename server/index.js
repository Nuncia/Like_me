const express = require('express');
const cors = require('cors');
const app = express();
const { obtenerTodosPosts, crearPost } = require('./models/model');

//Middleware
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3001;

app.listen(PORT, console.log('Servidor corriendo en puerto, 3001.'));

app.get('/posts', async (req, res) => {
   const posts = await obtenerTodosPosts();
   console.log(posts);
   res.json(posts);
});
app.post('/posts', async (req, res) => {
   const post = req.body;
   const nuevoPost = await crearPost(post);
   res.json(nuevoPost);
});
