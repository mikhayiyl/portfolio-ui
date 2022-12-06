import React from 'react'
import ChatBox from '../../pages/messenger/ChatBox'
import styled from 'styled-components';
import Messenger from '../../pages/messenger/Messenger';

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
  position: absolute;
  width: 300px;
  background: #5555;
  z-index: 50;
  top: 50vh;
  left: 50%;
`

const HomeChat = () => {

    return (
        <Container>
            <ChatBox />
            <Messenger />
        </Container>
    )
}

export default HomeChat