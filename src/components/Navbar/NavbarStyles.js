import styled from "styled-components";
import { FaSearch, FaTimesCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { mobile } from "../../ResponsiveDesigns";

export const NavBarContainer = styled.nav`
height: 2.7rem;
width: 100%;
display:flex;
justify-content:space-between;
align-items: center;
background-color:#120eff;
${mobile({ justifyContent: "center" })}

`
export const NavBarRight = styled.div`
cursor: pointer;
flex:40%;
height: 100%;
display:flex;
justify-content: space-between;

${mobile({ justifyContent: "center" })}
`
export const NavBarLinks = styled.div`
width: 70%;
display:flex;
align-items: center;
justify-content: space-around;
${mobile({ justifyContent: "flex-start", width: "auto" })}

`


export const NavBarProfile = styled.span`
cursor: pointer;
`

export const NavBarLinkItem = styled(Link)`
margin: 0 0.4rem;
font-size: 1rem;
${mobile({ display: "none" })}
`



export const NavbarIcons = styled.div`
width: 30%;
display:flex;
align-items: center;
justify-content: space-around;
margin:0.6rem;
position: relative;
${mobile({ width: "100%" })}

`



export const ProfilePicture = styled.img`
width: 38px;
height: 38px;
object-fit: cover;
border-radius: 50%;
margin:2px 0.5rem;
border: 2px solid #fff;
${mobile({ width: "30px", height: "30px", margin: "6.6px 0.5rem" })}
`

//FRIENDS_LIST
export const FriendsContainer = styled.div`
width:500px;
background-color: #fff;
box-shadow: 0 0 10px #000;
border-radius:0 0 3px 3px;
position: absolute;
top: 2.099rem;
right:0;
display:flex;
justify-content: center;
align-items: center;
flex-direction: column;
`
export const FriendsRequests = styled.div`
display: flex;
width: 100%;
justify-content:space-around;
`
export const Wrapper = styled.div`
margin-top:20px;
width: 100%;
justify-content:space-around;
text-align:center;
`
export const Friends = styled.div`
display: flex;
justify-content:space-around;
`
export const Profile = styled.div`
align-items: center;
cursor: pointer;
margin:0 2rem  0 -1.5rem;
`

export const ProfileImg = styled.img`
 height:30px;
 width: 30px;
 margin: 5px;
 border-radius:50% ;
 border: 1px solid #fff;
 object-fit: cover;
 `
export const ProfileName = styled.span`
 font-size: 1rem;
 color:deeppink;
 text-transform:capitalize;
 margin:0 5px;
 `
export const Btns = styled.div`
 display: flex;
 justify-content: space-between;
 `

export const Cancel = styled(FaTimesCircle)`
position: absolute;
top: 0;
right: 0;
font-size:1.3rem;
color: red;
margin:0.5rem;
`


//MOBILE BURGER

export const MobileIcon = styled.div`
  display: none;
  z-index: 101;

  @media screen and (max-width: 760px) {
    display: block;
    position: fixed;
    left: 0rem;
    top: 0rem;
    height: 2.7rem;
    width: 2.7rem;
    cursor: pointer;
    }
`;
export const Burger = styled.div`
  position: absolute;
  left: 0.2rem;
  top: 1rem;
  width: 34px;
  height: 6px;
  border-radius: 10px;
  background: white;
  transition: all 0.5s ease-in-out;

  &::before {
    content: "";
    position: absolute;
    top: -10px;
    width: 34px;
    height: 6px;
    border-radius: 10px;
    background: white;
  }

  &::after {
    content: "";
    position: absolute;

    top: 10px;
    width: 25px;

    height: 6px;
    border-radius: 10px;
    background: white;
  }

  &.open {
    transform: rotate(-720deg);
    background: transparent;

    &::before {
      transform: rotate(45deg) translate(8px, 8px);
    }

    &::after {
      width: 34px;
      transform: rotate(-45deg) translate(6px, -7px);
    }
  }
`;

export const SearchIcon = styled(FaSearch)`
display: none;
cursor: pointer;
font-size: 2rem;
margin: 0 4rem;
color: white;
${mobile({ fontSize: "1.5rem", display: "block" })};
`









