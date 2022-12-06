import React from 'react'
import { CircularProgress } from "@material-ui/core";



const LoadingIndicator = () => {
    return (
        <div style={{ width: "500px", height: "500px", position: 'absolute', transform: "translate(-50%, -50%)", top: "50%", left: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress size="5rem" />
        </div>
    )
}

export default LoadingIndicator