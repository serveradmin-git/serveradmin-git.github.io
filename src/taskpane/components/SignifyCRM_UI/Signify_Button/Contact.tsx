import React from 'react'
import { Button } from '@mui/material'
import { PersonAddAlt } from '@mui/icons-material'

const Contact = ({ onClick }) => {
    const handleClick = () => {
        onClick();
    };
    return (

        <Button onClick={handleClick} variant="contained" size="large" startIcon={<PersonAddAlt />} >Create Contact</Button>

    )
}

export default Contact