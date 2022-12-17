import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { Typography } from '@material-ui/core';

export default function LinearDeterminate({ progress }) {

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" value={progress}
                    sx={{ height: "8px", borderRadius: "4px" }}
                    color='inherit'
                />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" >{`${progress}%`}</Typography>
            </Box>
        </Box>
    );
}