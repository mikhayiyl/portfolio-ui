import styled from "styled-components";
import { FaBirthdayCake } from "react-icons/fa";
import { mobile } from "../../ResponsiveDesigns";

export const RightBarContainer = styled.div`
flex: 30%;
height: calc(100vh - 2.7rem);
padding: 10px;
background-color: violet;
position: sticky;
 top: 2.7rem;
 ${mobile({ display: "none", })}

`
export const RightBarWrapper = styled.div`
padding: 20px 20px 0 0;
`
export const BirthdayContainer = styled.div`
display: flex;
align-items: center;
`
export const BirthdayText = styled.span`
font-size: 16px;
font-weight: 300;
`
export const BirthdayIcon = styled(FaBirthdayCake)`
color: orangered;
font-size: 2rem;
margin-right:10px;
`


export const AdsImage = styled.img`
width: 100%;
border-radius: 10px;
margin: 30px 0 ;


`

export const FriendsList = styled.ul`
list-style: none;
margin: 0;
padding:0;

`
export const ListItem = styled.li`
display: flex;
align-items: center;
margin-bottom: 15px;
`
export const Title = styled.h4`
  font-size: 15px;

`


export const ProfileImgContainer = styled.div`
margin-right: 10px;
position: relative;
display: flex;
align-items: center;
`


export const ProfileImageIcon = styled.img`
width: 40px;
height: 40px;
border-radius: 50%;
object-fit: cover;
`

export const FriendName = styled.span`
font-size: 16px;
`

export const RightBarTitle = styled.h4`
font-size: 18px;
font-weight: 500;
margin-bottom: 10px;
text-transform: capitalize;
color:${props => props.theme === "dark" ? "orangered" : "deeppink"};
border-bottom:3px solid #444;
width: 210px;
`
export const FollowingImg = styled.img`
width: 70px;
height: 70px;
object-fit:cover;
border-radius:10px;
`
export const RightBarInfo = styled.div`
margin-bottom: 30px;
`
export const RightBarInfoItem = styled.div`
margin-bottom: 10px;
`
export const RightBarInfoKey = styled.span`
font-weight: 500;
margin-right: 15px;
color:${props => props.theme === "dark" ? "orangered" : "#444"};
`
export const RightBarInfoValue = styled.span`
font-weight: 300;

`
export const RightBarFollowings = styled.div`
display: flex;
flex-direction: column;

span{
  margin:0 auto;
}
`
export const RightBarFollowing = styled.div`
align-items: center;
cursor: pointer;
display: flex;
flex-direction: column;
`
export const RightBarFollowingUsername = styled.span`
font-size: 14px;
`