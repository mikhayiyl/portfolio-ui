import { Navigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header";
import Main from "../../components/Main";
import axios from "axios";
import { getPosts } from "../../components/services/PostsService";
import { useEffect, useState } from "react";
import logger from "../../components/services/logger";


const Home = ({ user }) => {
  const [posts, setPosts] = useState([]);

  //all posts
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    (async function loadPosts() {
      try {
        const { data } = await getPosts({ cancelToken: cancelToken.token });
        setPosts(data);
      } catch (error) {
        logger.log(error);
      }
    }())


    return () => {
      cancelToken.cancel();
    }

  }, []);




  if (!user) return <Navigate to='/' />
  console.count('HOME COMPONENT')

  return (
    <>
      <Header />
      <Main posts={posts} />
      <Footer />
    </>
  );
}

export default Home