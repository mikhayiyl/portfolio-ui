import { Rating, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { StarBorder } from '@material-ui/icons';
import axios from 'axios';
import asyncErrors from '../middleware/AsyncErrors';
import { Link, useLocation } from 'react-router-dom';
import { Link as LinkR } from 'react-scroll';
import { currentUser } from '../services/authService';

const Ratings = () => {
    const location = useLocation().pathname.split("/")[1];

    const [value, setValue] = useState(null);
    const [rated, isRated] = useState(false);






    useEffect(() => {
        const cancelToken = axios.CancelToken.source();

        const getRatings = asyncErrors(async () => {
            const { data } = await axios.get("/ratings", { cancelToken: cancelToken.token });
            setValue(data.rate === "NaN" ? 0 : data);

            const { data: rated } = await axios.put("/ratings/" + currentUser()._id, { project: "Facebook-clone" })
            isRated(rated)
        })

        getRatings()

        return () => {
            cancelToken.cancel();

        }


    }, [])




    return (
        <div className='center'>
            {!rated && <Typography component="legend"
                className='center'
                style={{
                    color: "#fff", fontWeight: "400"
                }} >
                support by your rating
            </Typography>}
            {location === "help" ? <LinkR to={rated ? "help" : "ratings"} smooth="true"
            >
                <Rate value={value} />
            </LinkR> : <Link to="/help">
                <Rate value={value} />

            </Link>}

        </div>
    )



}

export default Ratings








const Rate = ({ value }) => {
    return (
        <Rating
            name="simple-controlled"
            value={value}
            readOnly
            emptyIcon={<StarBorder style={{ color: "#fff" }} />}
        />)
}
