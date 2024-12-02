import React from 'react'
import { Button } from '@mui/material'
import { ReceiptLong } from '@mui/icons-material'

const Case = ({ onClick }) => {
    const handleClick = () => {
        onClick();
    };
    return (

        <Button onClick={handleClick} variant="contained" size="large" startIcon={<ReceiptLong />} >Create Case</Button>

    )
}

export default Case