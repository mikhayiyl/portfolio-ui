import styled from "styled-components"
import { ipad, mobile } from "../../ResponsiveDesigns"


export const FeedWrapper = styled.div`
flex:50%;
height: 100%;
background-color: pink;
border-radius: 10px;
padding: 10px;
  ${mobile({ width: "100%", })}
  
  `
export const FeedContainer = styled.div`
 flex: 50%;
 `

export const FeedBox = styled.div`
 width: 80%;
 margin: 0 auto;
 
 ${mobile({ width: "100%", })}
 ${ipad({ width: "100%", })}
 `

