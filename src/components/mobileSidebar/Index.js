import { Event, Favorite, Group, RecentActors, VideoLibrary, SaveOutlined } from "@material-ui/icons";
import React from "react";
import "./style.scss"
import { FaUserFriends } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { burgerClosed } from "../../store/menu";
const MobileSidebar = ({ user }) => {
  const { mobileBurger } = useSelector(state => state.entities.menubars);
  const dispatch = useDispatch();


  const onToggle = () => {
    dispatch(burgerClosed({ burger: "close" }))
  }




  return (
    <div className={mobileBurger ? "open sidebarContainer" : "sidebarContainer"} onClick={onToggle}>
      <ul className={mobileBurger ? "open sidebarMenu " : "sidebarMenu"} >
        <li className={mobileBurger ? "open sidebarMenu_item" : "sidebarMenu_item"}>
          <NavLink
            className='sidebarMenu_link'
            onClick={onToggle}

            to={`/profile/${user._id}/friends`}
          >
            <FaUserFriends className='margin' />
            Friends
          </NavLink>
        </li>

        <li className={mobileBurger ? "open sidebarMenu_item" : "sidebarMenu_item"}>
          <NavLink
            className={mobileBurger ? "sidebarMenu_link" : ""}
            onClick={onToggle}

            to="/home"
          >
            <Group className='margin' />
            Groups
          </NavLink>
        </li>
        <li className={mobileBurger ? "open sidebarMenu_item" : "sidebarMenu_item"}>
          <NavLink
            className={mobileBurger ? "sidebarMenu_link" : ""}
            onClick={onToggle}

            to="/services"
          >
            <VideoLibrary className='margin' />
            Watch
          </NavLink>
        </li>

        <li className={mobileBurger ? "open sidebarMenu_item" : "sidebarMenu_item"}>
          <NavLink
            className={mobileBurger ? "sidebarMenu_link" : ""}
            onClick={onToggle}

            to="/savedposts"
          >
            <SaveOutlined className='margin' />
            Saved Posts
          </NavLink>
        </li>
        <li className={mobileBurger ? "open sidebarMenu_item" : "sidebarMenu_item"}>
          <NavLink
            className={mobileBurger ? "sidebarMenu_link" : ""}
            onClick={onToggle}

            to="/services"
          >
            <Favorite className='margin' />
            Memories
          </NavLink>
        </li>
        <li className={mobileBurger ? "open sidebarMenu_item" : "sidebarMenu_item"}>
          <NavLink
            className={mobileBurger ? "sidebarMenu_link" : ""}
            onClick={onToggle}

            to="/services"
          >
            <Event className='margin' />
            Events
          </NavLink>
        </li>
        <li className={mobileBurger ? "open sidebarMenu_item" : "sidebarMenu_item"}>
          <NavLink
            className={mobileBurger ? "sidebarMenu_link" : ""}
            onClick={onToggle}

            to="/services"
          >
            <RecentActors className='margin' />
            Most Recent
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default MobileSidebar;
