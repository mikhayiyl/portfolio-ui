import "./style.scss"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Header from "../../components/Header"
import Footer from "../../components/Footer/Footer"
import asyncErrors from '../../components/middleware/AsyncErrors';
import Sidebar from "../../components/Sidebar/Sidebar"
import { Delete } from "@material-ui/icons";
import { format } from 'timeago.js';
const Notification = ({ state, dispatch }) => {
    const [notifications, setNotifications] = useState([]);





    //get notifications
    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const token = { cancelToken: cancelToken.token }
        const getNotifications = asyncErrors(async () => {
            const { data } = await axios.get(`/notifications/${state.user._id}`, token);
            const notifications = data.map(n => {
                const user = state.allusers.find(u => u._id === n.senderId)
                return { _id: n._id, username: user.username, text: n.text, image: user.profilePicture, createdAt: n.createdAt }

            })
            setNotifications(notifications);

        })

        getNotifications()

        return () => {
            cancelToken.cancel()
        }
    }, [state.user._id, state.allusers])


    const clearAll = asyncErrors(async () => {
        setNotifications([])
        await axios.delete(`/notifications/deleteall/${state.user._id}`)
    })
    const handleDelete = asyncErrors(async (id) => {
        setNotifications(notifications.filter(n => n._id !== id));
        await axios.delete(`/notifications/${id}`)
    })




    return (
        < >
            <Header />
            <main className={`main ${state.theme}`}>
                <div className="main-left">
                    <Sidebar user={state.user} />
                </div>
                <div className="main-mid">
                    <span className="badge bg-primary m-1">{notifications.length} notifications</span>

                    {notifications.map(notification => <article key={notification._id} className="article">
                        <span>
                            <img src={notification.image} alt={notification.username} className="profileImg" />
                            <p>{notification.text}</p>
                            <time>{format(notification.createdAt)}</time>
                        </span>
                        <Delete className="icons" onClick={() => handleDelete(notification._id)} />
                    </article>)}
                </div>
                <div className="main-right">
                    <button className="btn btn-info" onClick={clearAll}>clear all</button>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Notification