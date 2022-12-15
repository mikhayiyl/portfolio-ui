import { Navigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header";
import Main from "../../components/Main";
import axios from "axios";
import { getPosts } from "../../components/services/PostsService";
import { useEffect, useState } from "react";
import asyncErrors from "../../components/middleware/AsyncErrors";


const Home = ({ user }) => {
  const [posts, setPosts] = useState([]);

  //all posts
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    const loadPosts = asyncErrors(async () => {
      const { data } = await getPosts({ cancelToken: cancelToken.token });
      setPosts(data);
    })

    loadPosts();

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