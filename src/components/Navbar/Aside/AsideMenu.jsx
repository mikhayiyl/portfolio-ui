import { ArrowForwardIos, FeedbackOutlined, Help, LockOpen, Settings } from '@material-ui/icons'
import { FaMoon } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { profileBarClosed } from '../../../store/menu'
import "./style.scss";
import config from "../../../config.json"
const AsideMenu = ({ user }) => {
    const { profileNavMenu: open } = useSelector(state => state.entities.menubars);
    const dispatch = useDispatch();


    const closeMenu = () => {
        dispatch(profileBarClosed("close"))
    }




    return (
        <div className={open ? "open asideContainer" : "asideContainer"} onClick={closeMenu}>
            <ul className={open ? "open asideMenu" : "asideMenu"} >
                <li className={open ? "open asideMenu_item" : "asideMenu_item"}>
                    <NavLink
                        className='asideMenu_link'

                        onClick={closeMenu}
                        to={`/profile/${user._id}`}
                    >  <img src={config.imageUrl + user.profilePicture} alt={user.username} className="profile-img" />
                        <small className="text">

                            {user.username}
                        </small>

                    </NavLink>
                </li>
                <li className={open ? "open asideMenu_item" : "asideMenu_item"}>

                    <NavLink
                        className='asideMenu_link'
                        onClick={closeMenu}

                        to="/help"
                    >
                        <Help />
                        <small className="text">
                            Help & support
                        </small><ArrowForwardIos />
                    </NavLink>
                </li>
                <li className={open ? "open asideMenu_item" : "asideMenu_item"}>

                    <NavLink
                        className='asideMenu_link'
                        onClick={closeMenu}

                        to='/display'
                    >
                        <FaMoon />
                        <small className="text">
                            display & accessibility
                        </small> <ArrowForwardIos />
                    </NavLink>
                </li>
                <li className={open ? "open asideMenu_item" : "asideMenu_item"}>

                    <NavLink
                        className='asideMenu_link'
                        onClick={closeMenu}

                        to="/feedback"
                    >
                        <FeedbackOutlined />
                        <small className="text">
                            Feedback
                        </small>
                    </NavLink>
                </li>
                <li className={open ? "open asideMenu_item" : "asideMenu_item"}>

                    <NavLink
                        className='asideMenu_link'
                        onClick={closeMenu}

                        to="/settings"
                    >  <Settings />
                        <small className="text">
                            settings
                        </small><ArrowForwardIos />
                    </NavLink>
                </li>
                <li className={open ? "open asideMenu_item" : "asideMenu_item"}>
                    <NavLink
                        className='asideMenu_link'
                        to="/signout"
                    >  <LockOpen />
                        <small className="text">
                            Logout
                        </small>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default AsideMenu