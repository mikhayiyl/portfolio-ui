import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Feed from '../../components/Feed/Feed'
import Followers from './Followers'
import Followings from './Followings'
import Friends from './Friends'
import Gallery from './Gallery/Gallery'
import Images from './Images'
import { Wrapper } from './ProfileStyles'
import Rightbar from './Rightbar'

const FeedBox = styled.div`
    flex:30%;
`
const ProfileBottom = ({ ...rest }) => {

    const path = useLocation().pathname.split("/")[3];

    return (
        <Wrapper  >
            {(path === "about" || path === "posts" || !path) && <Rightbar {...rest} />}
            {path === "friends" && <Friends {...rest} />}
            {path === "followings" && <Followings {...rest} />}
            {path === "followers" && <Followers {...rest} />}
            {path === "images" && <Images {...rest} />}
            {path === "gallery" && <Gallery {...rest} />}
            {
                (path === "posts" || !path)
                && <FeedBox><Feed  {...rest} /></FeedBox>
            }
        </Wrapper >
    )
}

export default ProfileBottom