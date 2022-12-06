import React, { Component } from "react";
import {
  FaSignal,
  FaFileVideo,
  FaLayerGroup,
  FaFacebookMessenger,
  FaBookmark,
  FaQuestion,
  FaNetworkWired,
  FaEnvelopeOpenText,
  FaVectorSquare,
} from "react-icons/fa";
import {
  SidebarImg,
  SidebarList,
  SidebarListItem,
  SidebarProfile,
  SidebarProfileImg,
  SidebarProfileName,
  SidebarSpan,
} from "./SidebarStyles";

import http from "../services/httpService";
import { getFriends } from "../services/userService"
import config from "../../config.json"
import { Link } from "react-router-dom";
import logger from "../services/logger";
export default class Sidebar extends Component {
  user = this.props.user;

  state = {
    currentUserFriends: [],
  };

  async componentDidMount() {


    this.cancelToken = http.cancelToken.source()
    try {
      if (!this.user) return;

      const { data } = await getFriends(this.user._id, { cancelToken: this.cancelToken.token });
      this.setState({ currentUserFriends: data });
    } catch (error) {
      logger.log(error);
    }

  }

  componentWillUnmount() {
    this.cancelToken.cancel();
  }


  render() {
    const { currentUserFriends } = this.state;
    const { profilePicture, username, _id } = this.user
    const url = config.imageUrl;
    console.count('SIDEBAR COMPONENT')
    return (
      <div>
        <Link to={`/profile/${_id}`} className='link'>
          <SidebarProfile>
            <SidebarProfileImg src={url + profilePicture} alt={username} />
            <SidebarProfileName>{username}</SidebarProfileName>
          </SidebarProfile>
        </Link>
        <SidebarList>
          <SidebarListItem>
            <FaSignal />
            <SidebarSpan>Friends</SidebarSpan>
          </SidebarListItem>
          <SidebarListItem>
            <FaLayerGroup />
            <SidebarSpan>Groups</SidebarSpan>
          </SidebarListItem>
          <SidebarListItem>
            <FaFacebookMessenger />
            <SidebarSpan>Chats</SidebarSpan>
          </SidebarListItem>
          <SidebarListItem>
            <FaFileVideo />
            <SidebarSpan>Videos</SidebarSpan>
          </SidebarListItem>
          <SidebarListItem>
            <FaLayerGroup />
            <SidebarSpan>Marketplace</SidebarSpan>
          </SidebarListItem>

          <SidebarListItem>
            <FaBookmark />
            <SidebarSpan>Most Recent</SidebarSpan>
          </SidebarListItem>
          <SidebarListItem>
            <FaQuestion />
            <SidebarSpan>Questions</SidebarSpan>
          </SidebarListItem>
          <SidebarListItem>
            <FaNetworkWired />
            <SidebarSpan>Pages</SidebarSpan>
          </SidebarListItem>
          <SidebarListItem>
            <FaEnvelopeOpenText />
            <SidebarSpan>Events</SidebarSpan>
          </SidebarListItem>
          <SidebarListItem>
            <FaVectorSquare />
            <SidebarSpan>Courses</SidebarSpan>
          </SidebarListItem>
        </SidebarList>

        <button className="btn btn-secondary m-2">show more</button>
        <hr className="sidebarHr" />
        <SidebarList>
          {currentUserFriends.map((friend) => (

            <SidebarListItem key={friend._id}>
              <Link to={`/profile/${friend._id}`} className="link">
                <SidebarImg src={url + friend.profilePicture} alt={friend.username} />
                <SidebarSpan className="friendName">
                  {friend.username}
                </SidebarSpan>
              </Link>
            </SidebarListItem>
          ))}
        </SidebarList>
      </div>
    );
  }
}
