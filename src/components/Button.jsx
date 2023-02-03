import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from "styled-components"

const Link = styled(NavLink)`
position: relative;
display: inline-block;
padding: 10px 20px;
text-decoration: none;
text-transform: uppercase;
color:#fff;
background:transparent ;
letter-spacing: 2px;
font-size: 16px;
transition:0.5s;

&.active{
    color: orangered;
}

&:hover{
    color: rgba(255, 255, 255,1);


 

Span{


&:nth-child(1){
    
transform: scaleY(1);
transform-origin:top;
transition:transform 0.5s;
}

&:nth-child(2){
transform: scaleX(1);
transform-origin:left;
transition:transform 0.5s;

}

&:nth-child(3){
    
    transform: scaleY(1);
    transform-origin:bottom;
    transition:transform 0.5s;
    transition-delay:0.5s;

    }

    &:nth-child(4){
transform: scaleX(1);
transform-origin:right;
transition:transform 0.5s;
transition-delay:0.5s;

}

}
}

`
const Span = styled.span`
display: block;
position: absolute;
background: #2894ff;

&:nth-child(1){
    left:0;
bottom:0;
height: 100%;
width: 2px;
transform: scaleY(0);
transform-origin:bottom;
transition:transform 0.5s;
}
&:nth-child(2){
left:0;
bottom:0;
width: 100%;
height: 2px;
transform: scaleX(0);
transform-origin:right;
transition:transform 0.5s;
}

&:nth-child(3){
right:0;
bottom:0;
height: 100%;
width: 2px;
transform: scaleY(0);
transform-origin:top;
transition:transform 0.5s;
transition-delay:0.5s;

}


&:nth-child(4){
left:0;
top:0;
width: 100%;
height: 2px;
transform: scaleX(0);
transform-origin:left;
transition:transform 0.5s;
transition-delay:0.5s;

}


`

const Button = ({ child, link }) => {
    return (

        <Link to={link}>
            <Span></Span>
            <Span></Span>
            <Span></Span>
            <Span></Span>
            {child}
        </Link>

    )
}

export default Button