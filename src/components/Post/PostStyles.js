import { Send } from '@material-ui/icons';
import styled from "styled-components";
import { ipad, mobile } from '../../ResponsiveDesigns';
export const PostContainer = styled.div`
width: 100%;
border-radius: 10px;
margin: 30px 0;
-webkit-box-shadow:0px 0px 16px -8px #111;
box-shadow: 0px 0px 16px -8px #111;
position: relative;
`
export const PostWrapper = styled.div`
padding: 10px;

`

export const PostTop = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
cursor: pointer;
`

export const ProfileUsername = styled.span`
font-size: 18px;
font-weight: 500;
margin: 0 10px;
`
export const PostDate = styled.time`
font-size: 15px;

`

export const PostCenter = styled.div`
margin:20px 0 0;
align-items: center;
padding: 10px;
`
export const SpammedPost = styled.div`
margin-top: 20px;
width: 100%;
height:300px;
border-radius: 9px;
object-fit: contain;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
color: red;
font-size: 3rem;
user-select: none;background-image: linear-gradient(#111,#555); 
text-align: center;
${ipad({ maxHeight: "300px" })}

`
export const SpamText = styled.small`
font-size: 2rem;
color: #fff;
`



export const PostText = styled.p`
font-size: 15px;

`


export const PostImage = styled.img`
margin-top: 20px;
width: 100%;
max-height:300px;
border-radius: 9px;
object-fit: contain;
user-select: none;
${ipad({ maxHeight: "250px" })};
`
export const PostVideo = styled.video`
margin-top: 20px;
width: 100%;
max-height:300px;
border-radius: 9px;
object-fit: contain;
user-select: none;
`


export const PostTopRight = styled.div`
display: flex;
`
export const PostTopLeft = styled.div`
display: flex;
align-items: center;

`

export const PostLeft = styled.div`
display: flex;
align-items: center;
`
export const PostBottom = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`
export const PostBottomLeft = styled.div`
display: flex;
align-items: center;
`

export const PostBottomRight = styled.div`
display: flex;
align-items: center;
`
export const LikeCounter = styled.span`
font-size: 16px;
font-weight: 500;
`
export const CommentHeader = styled.small`
font-size: 16px;
cursor: pointer;
color: ${props => props.theme === "dark" ? "#fff" : "blue"};
font-weight: 500;
border-bottom: 1px dashed gray;
`


export const PostSidebar = styled.aside`
width: 45%;
height: auto;
z-index: 2;
position: absolute;
right: 0.3rem;
top: 3rem;
font-size: 1rem;
background:${props => props.theme === "dark" ? "#444" : "purple"};
color: #fff;
border-radius: 0.2rem;
opacity: 0.798;

`
export const PostSidebarWrapper = styled.ul`
width: 100%;
list-style-type: none;
margin: 0;
padding: 0;
width: 100%;
display: flex;
flex-flow: column;
padding: 0.3rem;
`
export const PostSidebarItem = styled.li`
margin: 0.3rem;
cursor: pointer;
display: flex;
align-items: center;
transition: all 0.5s ease-in-out;

&:hover{
    background-color: lightgreen;
    color: orangered;
    border-radius: 0.2rem;
}

`
export const PostSidebarText = styled.small`
margin-left: 0.3rem;
font-size: 10px;
`
//POST COMMENTS STYLES
export const CommentsContainer = styled.div`
max-width: 100%;
height: 450px;
background-image: radial-gradient(${props => props.theme === "dark" ? "#111,#444" : "purple,lightblue"});
border-radius: 5px;
`
export const CommentsWrapper = styled.div`
 display: flex;
 height: ${props => props.spam ? "100%" : "80%"};
 padding: 0.5rem;
 background:linear-gradient(to right ,${props => props.theme === "dark" ? "#111,#333" : "blue,white"});
 flex-direction: column;
 justify-content: space-between;
 overflow-y:scroll;
`
export const Comment = styled.article`
position: relative;
margin:1rem 0 ;
`
export const CommentTop = styled.div`
display: flex;
align-items: center;
justify-content:between;
`
export const CommentMenu = styled.div`
margin-Left:1rem;
display: flex;
position: relative;

${mobile({ maxLeft: "0.3rem" })}

`
export const CommentBottom = styled.span`
font-size:0.9rem;
color:white;
display: flex;
align-items: center;
position: absolute;
bottom: -1rem;
left: 2rem;
`

export const CommentProfileImg = styled.img`
width: 30px;
height: 30px;
border-radius:50%;
object-fit:cover;
border:1px solid #fff;
margin: 0 0.3rem;
`
export const CommentText = styled.p`
border-radius: 20px;
background-color: #333;
color: #fff;
max-width: 250px;
font-size:1rem;
margin-bottom: 1rem;
padding: 10px;
overflow-x:hidden;
`
export const CommentSmall = styled.small`
padding: 0.4rem;
border-radius: 20px;
color: #fff;
font-size:0.8rem;
font-weight:400;
cursor: pointer;
`

export const TextInputWrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin:0.3rem;
height: 20%;
`
export const SendIcon = styled(Send)`
font-size: 2rem;
color: ${props => props.theme === "dark" ? "#fff" : "blue"};
cursor: pointer;
`

//comments sidebarMenu
export const CommentSidebar = styled.aside`
position: absolute;
bottom: 0;
left: 0;
width:max-content;
height: auto;
z-index: 2;
font-size: 1rem;
background:${props => props.theme === "dark" ? "#444" : "purple"};
color: #fff;
border-radius: 0.2rem;
opacity: 0.798;

${mobile({ width: "auto", })}



`
