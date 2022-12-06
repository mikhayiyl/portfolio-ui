import styled from "styled-components";

const Icon = styled.div`
display: ${props => props.flex && "flex"};
cursor: pointer;
`
const IconDots = styled.div`
width: 5px;
height: 5px;
box-shadow: 0 0 5px 0 #000;
margin:0.2rem;
background-color: ${props => props.theme === "dark" ? "#fff" : "red"};
border-radius: 50%;
`



const DottedMenu = ({ flex, theme }) => {
    return (
        <Icon flex={flex}>
            <IconDots theme={theme} />
            <IconDots theme={theme} />
            <IconDots theme={theme} />
        </Icon>
    )
}

export default DottedMenu;