import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./style.scss"
import { format } from 'timeago.js';
import { Link as Links } from 'react-scroll';
import { CancelOutlined } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { notificationClosed } from "../../store/menu";
import { Link } from 'react-router-dom';
import asyncErrors from "../middleware/AsyncErrors"
const Notification = ({ state }) => {
    const [notifications, setNotifications] = useState([]);
    const dispatch = useDispatch();





    //get notifications
    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const token = { cancelToken: cancelToken.token }
        const getNotifications = asyncErrors(async () => {
            const { data } = await axios.get(`/notifications/${state.user._id}`, token);
            const notifications = data.map(n => {
                const user = state.allusers.find(u => u._id === n.senderId)
                return { _id: n._id, username: user.username, text: n.text, image: user.profilePicture, createdAt: n.createdAt, postId: n.postId }

            })
            setNotifications(notifications);

        })


        getNotifications()

        return () => {
            cancelToken.cancel()
        }
    }, [state.user._id, state.allusers])


    if (notifications.length < 1) return <div className='notification center'>
        <p>No recent notification</p>
    </div>
    return (
        <div className='notification'>
            <CancelOutlined className='exit' onClick={() => dispatch(notificationClosed("close"))} />
            <ul className='notification-ul'>
                {notifications.slice(0, 10).map(notification =>
                    <li key={notification._id} className='notification-li'>
                        <Links
                            to={notification.postId}
                            smooth={true}
                            duration={500}
                            exact="true"
                            className='notification-link link'>
                            <span className='art'>
                                <img src={notification.image} alt={notification.username} className="profileImg" />
                                <p>{notification.text}</p>
                                <time>{format(notification.createdAt)}</time>
                            </span>
                        </Links>
                    </li>)
                }
            </ul>
            <Link to="/notifications" className="notification-btn btn badge bg-primary link m-1">
                see more
            </Link>
        </div>
    )
}

export default Notification