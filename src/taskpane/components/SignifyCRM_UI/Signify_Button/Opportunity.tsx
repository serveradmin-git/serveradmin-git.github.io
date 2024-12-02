import React from 'react';
import { Button } from '@mui/material'
import { AddCard } from '@mui/icons-material'

const Opportunity = ({ onClick }) => {
    const handleClick = () => {
        onClick();
    };
    return (

        <Button onClick={handleClick} variant="contained" size="large" startIcon={<AddCard />} >Create Opportunity</Button>

    )
}

export default Opportunity