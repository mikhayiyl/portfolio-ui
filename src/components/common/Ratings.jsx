import React, { useState } from 'react'
import { Rating, Typography } from '@mui/material'
import { StarBorder } from '@material-ui/icons';

const Ratings = () => {
    const [value, setValue] = useState(null);

    return (
        <div className='center'>
            <Typography component="legend"
                className='center'
                style={{
                    color: "#fff", fontWeight: "400"
                }} >
                support by your rating
            </Typography>
            <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => { setValue(newValue) }}
                emptyIcon={<StarBorder style={{ color: "#fff" }} />}
            />

        </div>
    )
}

export default Ratings