import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { mobile } from '../../../ResponsiveDesigns';
import { searchMenuClosed } from '../../../store/menu';
import { useDispatch } from 'react-redux';

const Container = styled.aside`
max-height:200px;
width: 300px;
height: auto;
margin: 0 auto;
padding: 3px;
position: absolute;
top: 2.7rem;
overflow-y:scroll;
left:27%;
z-index: 200;
${mobile({ left: "1rem" })}

`
const Input = styled.input`
border: 2px solid #000;
position: sticky;
top: 0;
display: none;
${mobile({ display: "block" })}


`

const Wrapper = styled.ul`
    height: auto;
    border-radius:0.3rem;    
    list-style: none;
    opacity: 0.95;
    background:#444;
    `

const Text = styled.small`
    font-size:1rem;
    margin-left:0.8rem;
    font-weight: 400;
    text-transform:capitalize;

`
const List = styled.li`
padding:10px 0;
cursor: pointer;
color: #fff;
`
const ProfileLink = styled(Link)`
width: 100%;
padding: 0 3px;
border-radius: 5px;
&:hover{
    background-color:crimson;
    color:white;
}

`


const SearchBox = ({ filters, setText, theme }) => {
    const dispatch = useDispatch();
    const clearBar = () => {
        setText('');
        dispatch(searchMenuClosed("close"))

    }

    return (
        <Container>
            <Input type="text" className="form-control" onChange={e => setText(e.target.value.trim())} />
            <Wrapper theme={theme}>
                {filters.map(user => <ProfileLink key={user._id} to={`/profile/${user._id}`} onClick={clearBar} className='link'><List >
                    <img src={user.profilePicture} className='profileImg' alt={user.username} />
                    <Text>{user.username}</Text>
                </List></ProfileLink>)}
            </Wrapper>
        </Container>
    )
}

export default SearchBox