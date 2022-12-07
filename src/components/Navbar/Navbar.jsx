import { useState, useEffect } from "react";
import Icon from "../common/Icons/Icons";
import Logo from "../common/Logo/Logo";
import SearchInput from "../common/SearchInput";
import {
  NavBarRight,
  NavBarLinks,
  NavbarIcons,
  ProfilePicture,
  NavBarProfile,
  MobileIcon,
  Burger,
  SearchIcon,
  NavBarLinkItem
} from "./NavbarStyles";
import FriendsBar from "./FriendsBar";
import { ChatBubble, Gamepad, Group, HomeTwoTone, LiveTv, NotificationsActive } from '@material-ui/icons';
import { useSelector, useDispatch } from "react-redux";
import { burgerClosed, burgerOpenned, friendsBarClosed, friendsBarOpenned, profileBarClosed, profileBarOpenned, searchMenuClosed, searchMenuOpenned } from "../../store/menu";
import SearchBox from "../common/SearchBox/SearchBox";
import { Link } from "react-router-dom";


const Navbar = ({ state, Dispatch }) => {
  const [searchText, setText] = useState('');
  const [filters, setFilter] = useState([]);
  const dispatch = useDispatch();
  const { mobileBurger, friendsNavMenu, profileNavMenu, searchMenu } = useSelector(state => state.entities.menubars);

  //requests

  useEffect(() => {
    const users = state.allusers
    setFilter(f => searchText ? users.filter((user) =>
      user.username.toLowerCase().startsWith(searchText.toLowerCase())) : [...f])

  }, [searchText, state.allusers]) //depending users



  //mobileBurger
  const onToggle = () => {
    if (mobileBurger) {
      dispatch(burgerClosed({ burger: "close" }))

    } else {
      dispatch(burgerOpenned({ burger: "open" }))

    }
  }
  //navFriendsBar
  const openFriendsbar = () => {
    if (friendsNavMenu) {
      dispatch(friendsBarClosed("close"))

    } else {
      dispatch(friendsBarOpenned("open"))

    }
  }
  //navProfileBar
  const openProfilebar = () => {
    if (profileNavMenu) {
      dispatch(profileBarClosed("close"))

    } else {
      dispatch(profileBarOpenned("open"))

    }
  }
  //open SearchBox
  const openSearch = () => {
    if (searchMenu) {
      dispatch(searchMenuClosed("close"))

    } else {
      dispatch(searchMenuOpenned("open"))

    }
  }






  console.count("NAVBAR COMPONENT")
  return (
    <>
      <Logo theme={state.theme} />
      <MobileIcon onClick={onToggle}>
        {mobileBurger ? <Burger className="open" /> : <Burger />}
      </MobileIcon>
      <SearchInput setText={setText} theme={state.theme} />
      <SearchIcon onClick={openSearch} />
      {(searchMenu || searchText.length > 0) && <SearchBox filters={filters} setText={setText} />}

      <NavBarRight>
        <NavBarLinks>
          <span>
            <Link to="/">
              <HomeTwoTone className='icons' />
            </Link>
          </span>
          <NavBarLinkItem to="">
            <LiveTv className='icons' />
          </NavBarLinkItem>
          <NavBarLinkItem to="">
            <Gamepad className='icons' />
          </NavBarLinkItem>
        </NavBarLinks>

        <NavbarIcons>
          {friendsNavMenu && <FriendsBar onOpen={openFriendsbar} state={state} Dispatch={Dispatch} />}
          <Icon count={state.requests.length} icon={<Group onClick={openFriendsbar} className="icons" />} />
          <Icon count={0} icon={
            <Link to='/messenger'><ChatBubble className="icons" /></Link>} />
          <Icon count={0} icon={<NotificationsActive className="icons" />} />
        </NavbarIcons>
        <NavBarProfile onClick={openProfilebar}>
          <ProfilePicture src={state.user.profilePicture} alt={state.user.username} />
        </NavBarProfile>
      </NavBarRight>
    </>
  );
};

export default Navbar;
