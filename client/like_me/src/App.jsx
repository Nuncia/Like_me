import axios from 'axios';
import { useEffect, useState } from 'react';
import Form from './components/Form';
import Post from './components/Post';

const urlBaseServer = 'http://localhost:3001';

function App() {
   const [titulo, setTitulo] = useState('');
   const [imgSrc, setImgSRC] = useState('');
   const [descripcion, setDescripcion] = useState('');
   const [posts, setPosts] = useState([]);

   const getPosts = async () => {
      axios
         .get(`${urlBaseServer}/posts`)
         .then((response) => {
            const arreglo = response.data?.posts;
            if (arreglo) {
               setPosts([...arreglo]);
            }
         })
         .catch((error) => {
            console.log(error);
         });
   };

   const agregarPost = async () => {
      const post = { titulo, url: imgSrc, descripcion };
      const respuesta = await axios.post(urlBaseServer + '/posts', post);
      const claves = respuesta.data;
      console.log(claves.respuesta);
      if (claves.respuesta.error) {
         alert('Todos los campos obligatorios.');
      }
      getPosts();
   };

   const modificarPost = async () => {
      const post = { titulo, imgSrc, descripcion };
   };

   // este método se utilizará en el siguiente desafío
   const like = async (id) => {
      await axios.put(urlBaseServer + `/posts/like/${id}`);
      getPosts();
   };

   // este método se utilizará en el siguiente desafío
   const eliminarPost = async (id) => {
      console.log(id);
      await axios.delete(urlBaseServer + `/posts/${id}`);
      getPosts();
   };

   useEffect(() => {
      getPosts();
   }, []);

   return (
      <div className="App">
         <h2 className="py-5 text-center">&#128248; Like Me &#128248;</h2>
         <div className="row m-auto px-5">
            <div className="col-12 col-sm-4">
               <Form
                  setTitulo={setTitulo}
                  setImgSRC={setImgSRC}
                  setDescripcion={setDescripcion}
                  agregarPost={agregarPost}
               />
            </div>
            <div className="col-12 col-sm-8 px-5 row posts align-items-start">
               {posts.length > 0 ? (
                  posts.map((post, i) => (
                     <Post
                        key={i}
                        post={post}
                        like={like}
                        eliminarPost={eliminarPost}
                     />
                  ))
               ) : (
                  <div className="card">
                     <div className="card-body">
                        <h2>No hay post</h2>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}

export default App;
