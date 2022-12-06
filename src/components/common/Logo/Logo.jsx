import { FaMoon } from "react-icons/fa";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { mobile } from '../../../ResponsiveDesigns';



const LogoWrapper = styled(Link)`
flex:20%;
margin-left: 10px;
text-decoration: none;
color: orangered;
font-size: 1.5rem;

&:hover{
  color: red;
}
${mobile({ display: "none" })}


@media only screen and (max-width:820px){
    font-size: 1rem;
}

`


const LogoSpan = styled.span`
text-decoration: none;
color: ${props => props.theme === "light" ? "#000" : "#fff"};

`


const Logo = ({ theme }) => {
  return (
    <LogoWrapper to="/">
      <LogoSpan className="fa" theme={theme}>SPA</LogoSpan>
      <FaMoon className="fa-spin" />
      <LogoSpan theme={theme}>E</LogoSpan>
      <LogoSpan theme={theme}></LogoSpan>
      <LogoSpan theme={theme}>M</LogoSpan>I<LogoSpan theme={theme}>K</LogoSpan>HA
      <LogoSpan theme={theme}>Y</LogoSpan>IYL
    </LogoWrapper>
  );
};

export default Logo;
