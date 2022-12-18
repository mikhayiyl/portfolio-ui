import { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';
import asyncErrors from '../middleware/AsyncErrors';
import { currentUser } from '../services/authService';
import { Typography } from '@material-ui/core';


const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function HoverRating() {
  const [rated, isRated] = useState(false);
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);



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
      <div>
        <Box
          sx={{
            width: 200,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Rating
            name="simple-controlled"
            value={value}
            readOnly
            precision={0.5}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={<StarIcon style={{ opacity: 0.55, color: "#666" }} fontSize="inherit" />}
          />
          {value !== null && (
            <Box sx={{ ml: 2, color: "#fff" }}>{labels[hover !== -1 ? hover : value]}</Box>
          )}
        </Box>
      </div>

    </div>
  );
}





