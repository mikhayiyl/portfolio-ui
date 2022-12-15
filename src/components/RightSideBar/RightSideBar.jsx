import {
  BirthdayContainer,
  BirthdayIcon,
  AdsImage,
  BirthdayText,
  RightBarWrapper,
  ProfileImgContainer,
  ProfileImageIcon,
  ListItem,
  FriendsList,
  Title,
  FriendName,
} from "./RightBarStyles";
import { getConversation } from "../services/chatApi";
import axios from "axios";
import asyncErrors from "../middleware/AsyncErrors";



const RightSideBar = ({ setcurrentChat, setFriend, setIsOpen, user, onlineFriends }) => {

  const openConversation = asyncErrors(async (friend) => {
    setIsOpen(true);
    const { data } = await getConversation(user._id, friend._id);
    await axios.put(`/messages/read/${user._id}`, { senderId: friend._id })
    setFriend(friend);
    setcurrentChat(data);
  })

  console.count('RIGHTSIDEBAR COMPONENT');
  return (
    <>
      <div>
        <RightBarWrapper>
          <BirthdayContainer>
            <BirthdayIcon />
            <BirthdayText>
              <b>mikhayiyl</b> and <b>3 other friends</b> have their birthday
              today
            </BirthdayText>
          </BirthdayContainer>
          <AdsImage src="/assets/profile/disha.jpg" alt="" />
          <Title>Online Friends</Title>
          <FriendsList>
            {onlineFriends.map((friend) => (
              <ListItem key={friend?._id} onClick={() => openConversation(friend)} >


                <ProfileImgContainer>
                  <ProfileImageIcon
                    src={friend.profilePicture}
                    alt={friend.username}
                  />
                  <div className="chatOnlineBadge"></div>
                </ProfileImgContainer>
                <FriendName>{friend.username}</FriendName>

              </ListItem>
            ))}
          </FriendsList>
        </RightBarWrapper>
      </div>
    </>)

}



export default RightSideBar;
