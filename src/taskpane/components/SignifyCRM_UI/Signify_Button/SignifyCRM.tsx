import React from 'react'
import { Button } from '@mui/material'
import { Search } from '@mui/icons-material'



const SignifyCRM = ({ onClick }) => {
    const handleClick = () => {
        onClick();
    };
    return (

        <Button onClick={handleClick} variant="contained" size="large" startIcon={<Search />} >Find in SignifyCRM</Button>

    )
}

export default SignifyCRM