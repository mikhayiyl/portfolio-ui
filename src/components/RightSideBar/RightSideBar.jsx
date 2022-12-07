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
import logger from "../services/logger";



const RightSideBar = ({ setcurrentChat, setFriend, setIsOpen, user, onlineFriends }) => {

  const openConversation = async (friend) => {
    setIsOpen(true);
    try {
      const { data } = await getConversation(user._id, friend._id);
      setFriend(friend);
      setcurrentChat(data);
    } catch (error) {

      logger.log(error);

    }

  }

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
