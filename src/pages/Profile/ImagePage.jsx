import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import config from "../../config.json"
import styled from 'styled-components'

const Container = styled.div`
width: 100%;
height: 100vh;
background: linear-gradient(#222,#444);
display: flex;
align-items: center;
justify-content: center;
padding: 15px;
`

const Button = styled.button`
position: absolute;
top: 10px;
left: 10px;
`;
const Image = styled.img`
    max-width: 400px;
    height: 90%;
    border-radius: 10px;
    box-shadow: 0 0 5px 0 #fff;
    object-fit: contain;


 @media only screen and (max-width:768px){
    width: 100%;
}
`
const ImagePage = () => {
    const { id } = useParams()
    const navigate = useNavigate()


    const url = config.imageUrl
    return (
        <Container>
            <Button onClick={() => navigate(-1)} className="btn btn-info btn-sm">Back</Button>
            <Image src={url + id} alt={id} />

        </Container>
    )
}

export default ImagePage