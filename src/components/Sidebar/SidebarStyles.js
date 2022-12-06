import styled from "styled-components"
import { mobile } from "../../ResponsiveDesigns"


export const SidebarContainer = styled.div`
flex: 25%;
height: calc(100vh - 45px);
background-color: lightblue;
overflow-y: scroll;
position: sticky;
top: 2.7rem;

${mobile({ display: "none", })}


`
export const SidebarProfile = styled.div`
 display: flex;
align-items: center;
cursor: pointer;
 `


export const SidebarProfileImg = styled.img`
 height:30px;
 margin: 5px;
 width: 30px;
 border-radius:50% ;
 border: 1px solid #fff;
 object-fit: cover;
 `
export const SidebarProfileName = styled.span`
 font-size: 16px;
 font-weight: 500;
 color:deeppink;
 text-transform:capitalize;
 `
export const SidebarList = styled.ul`
 padding: 0;
  margin: 0;
  list-style: none;

`
export const SidebarListItem = styled.li`
  display: flex;
  font-size: 16px;
  align-items: center;
  margin: 0 0 15px 10px;

`
export const SidebarSpan = styled.span`
margin-left: 10px;
`
export const SidebarImg = styled.img`
width: 32px;
height: 32px;
border-radius: 50%;
object-fit: cover;

`