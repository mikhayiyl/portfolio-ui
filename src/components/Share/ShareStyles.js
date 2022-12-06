import { CancelRounded } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../../ResponsiveDesigns";
export const ShareBox = styled.div`
width: 100%;
border-radius: 10px;
padding: 0.5rem;

-webkit-box-shadow:0px 0px 16px -8px #111;
box-shadow: 0px 0px 16px -8px #111;

${mobile({ marginTop: "2.7rem" })}
`
export const BoxWrapper = styled.div`
padding: 0.5rem;
border-radius: 10px;
`


export const ShareTop = styled.div`
display: flex;
align-items: center;
`
export const ShareTopWrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 10%;
`
export const ShareHr = styled.hr`
margin: 20px;
`

export const Preview = styled.div`
position: relative;
padding: 0 20px 10px 20px;
border-radius:10px;
`
export const PreviewImage = styled.img`
width: 98%;
max-height:300px;
object-fit: contain;
border-radius:10px;
box-shadow: 0px 0px 10px 3px #000;
cursor: pointer;
transition: all 3s ease-in-out;
&:hover{
    box-shadow: 0px 0px 10px 3px orangered;
    transform: scale(0.9);
}
`
export const PreviewVideo = styled.video`
width: 98%;
max-height:300px;
border-radius:10px;
object-fit: contain;
box-shadow: 0px 0px 10px 3px #000;
cursor: pointer;
transition: all 3s ease-in-out;
&:hover{
    box-shadow: 0px 0px 10px 3px orangered;
    transform: scale(0.9);
}
`
export const CancelImage = styled(CancelRounded)`
position: absolute;
top: -10px;
right: 0px;
color:red;
cursor: pointer;
font-size:2rem;

`


export const ProfileImg = styled.img`
width: 40px;
height: 40px;
border-radius: 50%;
object-fit: cover;
border:2px solid #fff;
${mobile({ width: "30px", height: "30px" })}

`
export const ShareBottom = styled.form`
display: flex;
align-items: center;
justify-content: space-between;
`

export const ShareOptions = styled.div`
display: flex;
justify-content: center;
align-items: center;

`
export const ShareOption = styled.label`
display: flex;
align-items: center;
margin-right:1rem;
cursor: pointer;
font-size: 1rem;
${mobile({ fontSize: "0.9rem", marginRight: "0.3rem" })}

`
export const ShareText = styled.span`
margin-left: 1rem;
font-size: 1rem;
font-weight: 500;
${mobile({ marginLeft: "0.3rem", fontSize: "0.8rem" })}
`

