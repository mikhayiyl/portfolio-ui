import { useEffect, useState } from 'react'
import { getsavedPosts } from '../components/services/PostsService'
import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer/Footer'
import { Navigate } from 'react-router-dom'
import asyncErrors from '../components/middleware/AsyncErrors'

const SavedPosts = ({ user }) => {


    const [posts, setPosts] = useState([]);



    //profile user saved posts 
    useEffect(() => {
        const getPosts = asyncErrors(async () => {
            const { data } = await getsavedPosts(user._id);
            setPosts(data);

        })
        getPosts();
    }, [user])



    if (!user) return <Navigate to="/" />;
    return (
        <section>
            <Header />
            <Main posts={posts} />
            <Footer />
        </section>
    )
}

export default SavedPosts