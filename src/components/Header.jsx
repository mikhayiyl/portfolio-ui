import React from 'react'
import styled from "styled-components";
import { mobile } from '../ResponsiveDesigns';
import MobileSidebar from './mobileSidebar/Index';
import AsideMenu from './Navbar/Aside/AsideMenu';
import Navbar from './Navbar/Navbar';
import { NavBarContainer } from './Navbar/NavbarStyles';
import { useContext } from 'react';
import AppContext from './context/AppContext/AppContext';
import Notification from './notification/Notification';
import { useSelector } from 'react-redux';
const Container = styled.header`
    position: sticky;
    top: 0;
    z-index: 100;

    ${mobile({ position: 'fixed', top: '0', left: '0', right: '0', marginBottom: '2.7rem' })}

`
const Header = () => {
    const { state, dispatch } = useContext(AppContext);
    const { notification } = useSelector(state => state.entities.menubars);

    const theme = state.theme
    const user = state.user
    return (
        <Container >
            <NavBarContainer className={theme ? theme : ""}>
                <Navbar state={state} Dispatch={dispatch} />
            </NavBarContainer>
            <MobileSidebar user={user} />
            <AsideMenu user={user} />
            {notification && <Notification state={state} />}
        </Container>
    )
}

export default Header