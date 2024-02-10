import axios from 'axios';
import { useEffect, useState } from 'react';
import Form from './components/Form';
import Post from './components/Post';
import { successToast, errorToast } from './utils/toast';

const urlBaseServer = 'http://localhost:3003';

function App() {
   const [titulo, setTitulo] = useState('');
   const [imgSrc, setImgSRC] = useState('');
   const [descripcion, setDescripcion] = useState('');
   const [posts, setPosts] = useState([]);

   const getPosts = async () => {
      const posts = await axios.get(`${urlBaseServer}/posts`);
      const arregloPosts = posts.data.posts;
      setPosts(arregloPosts);
   };

   const agregarPost = async () => {
      const post = { titulo, url: imgSrc, descripcion };
      console.log(post);
      const respuesta = await axios.post(
         'http://localhost:3003' + '/posts',
         post
      );
      const claves = respuesta.data.respuesta;
      console.log(claves);
      if (claves) {
         alert(claves.msg);
      }
      // setTitulo('');
      // setImgSRC('');
      // setDescripcion('');
      getPosts();
   };

   const likePostById = async (id) => {
      const likeUpDate = await axios.put(urlBaseServer + `/posts/likes/${id}`);
      const status = likeUpDate.data;
      console.log(status);
      if (status.message != 'Post modificado exitosamente.') {
         alert(status.message);
      }
      getPosts();
   };

   /**
    * Deletes a post with the given ID.
    */
   const eliminarPost = async (id) => {
      try {
         const { data } = await axios.delete(urlBaseServer + `/posts/${id}`);
         getPosts();
         console.log(data);
         alert(data.msg);
      } catch (error) {
         alert(`Error al eliminar. Vuelva ca cargar la pagina. : ${error}`);
      }
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
                  posts?.map((post, i) => (
                     <Post
                        key={i}
                        post={post}
                        // like={like}
                        eliminarPost={eliminarPost}
                        likePostById={likePostById}
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
