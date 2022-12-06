import { FaCamera } from "react-icons/fa";
import styled from "styled-components";
import { mobile } from "../../ResponsiveDesigns";

export const ProfileContainer = styled.div`
display: flex;
`

export const ProfileRightWrapper = styled.div`
flex: 75%;
`
export const ProfileTop = styled.div`
background-color:#222;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

export const ProfileCover = styled.div`
position: relative;
height: 300px;
width: 60%;
${mobile({ width: "100%" })}
`
export const ProfileFriends = styled.div`
height: 70px;
display: flex;
justify-content: center;
align-items: center;
text-align: center;
width: 60%;

span{
      color: #fff;
      font-weight: 500;
      margin-right: 10px;
}
`




export const ProfileCoverpageImage = styled.img`
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius:0.5rem;
      `
export const CoverImageBox = styled.div`
        width: 100%;
        box-shadow: 0 0  8px 0 #fff;
        height: 250px;
        border-radius:0.5rem;
        position: relative;
`
export const ProfileUserImageBox = styled.div`
        width: 150px;
        height: 150px;
        position: absolute;
        left: 0;
        right: 0;
        top: 150px;
        margin: auto;

        ${mobile({ width: "100px", height: "100px" })}
`
export const ProfileUserImage = styled.img` 
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
        border: 3px solid #fff;
        


        `
export const CameraIcon = styled(FaCamera)`
        color: #fff;
        cursor: pointer;
        position:absolute;
        bottom:0;
        right: 1rem;
        background: #333;
        width: 2.5rem;
        height: 2.5rem;
        padding: 0.5rem;
        border-radius: 50%;
        `
export const ProfileUserInfo = styled.div` 
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    `
export const ProfileUsername = styled.h4`
      font-size: 24px;
      color: #fff;
      `
export const ProfileUserDescription = styled.span`
  font-weight: 300;
  color: #fff;
      `


export const RightBarContainer = styled.div`
flex: 25%;
height: 100%;
padding: 10px;
background-color: violet;
position: sticky;
top: 15px;

${mobile({ position: "static", height: "auto" })}
 
 `
export const ProfileList = styled.ul`
width: 60%;
height: 60px;
display: flex;
flex-wrap: wrap;
align-items: center;
border: 1px solid #fff;
list-style: none;
margin: 0;
padding: 0;
color:red;

${mobile({ width: "100%" })}

`
export const ProfileListItem = styled.li`
  font-weight: 500;
  margin-right: 0.5rem;
`

export const Wrapper = styled.div`
width: 60%;
margin: 0 auto;
position: relative;
display: flex;
background: ${props => props.path === "gallery" ? "#333" : ""};

${mobile({ width: "100%", margin: "0", flexDirection: "column" })}

`


