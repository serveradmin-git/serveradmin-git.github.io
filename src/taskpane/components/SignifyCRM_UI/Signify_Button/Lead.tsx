import React from 'react'
import { Button } from '@mui/material'
import { ZoomInOutlined } from '@mui/icons-material'
const Lead = ({ onClick }) => {
    const handleClick = () => {
        onClick();
    };
    return (

        <Button onClick={handleClick} variant="contained" size="large" startIcon={<ZoomInOutlined />} >Create Lead</Button>

    )
}

export default Lead