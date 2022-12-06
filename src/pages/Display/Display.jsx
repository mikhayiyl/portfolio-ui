import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import styled from "styled-components";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header";

const Default = styled.div`
 background-color: #fff;
 color: ${props => props.theme === "dark" ? "#000" : ""};
 box-shadow: 0 0 5px 1px #000 !important;
 .icon{
        color: ${props => props.theme === "dark" ? "red" : ""};
    font-size: 1.5rem;

}    
&:hover{
    transform:scale(0.9) !important;
}
`
const NightTheme = styled.div`
background-color: #222;
color: #fff;
box-shadow: 0 0 5px 1px ${props => props.theme === "dark" ? "#fff !important" : ""};

&:hover{
    transform:scale(0.9) !important;
    }

`
const Title = styled.div`
margin-top: 2rem;

h1{
    color:${props => props.theme === "dark" ? "#fff" : ""};
}


`


const Display = ({ theme, dispatch }) => {


    return (
        <>
            <Header />
            <main id="contact" className={theme}>
                <div className="contact container">
                    <Title theme={theme}>
                        <h1 className="section-title">
                            Change<span>Themes</span>
                        </h1>
                    </Title>

                    <div className="contact-items">

                        <Default className="contact-item default" theme={theme} onClick={() => dispatch({ type: "LIGHT" })}>
                            <FaSun className="icon" />
                            <div className="contact-info">
                                <h2>Default Theme</h2>
                            </div>
                        </Default>

                        <NightTheme className="contact-item" theme={theme} onClick={() => dispatch({ type: "DARK" })}>
                            <FaMoon className="icon" />
                            <div className="contact-info">
                                <h2>Night Mode</h2>
                            </div>
                        </NightTheme>

                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Display;
