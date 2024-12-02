import { TextField } from '@mui/material'
import React from 'react'

const MobileInput = ({ onChange }) => {
    const handleMobileChange = (event) => {
        const { value } = event.target;
        onChange(value);
    };
    return (

        <TextField label="Mobile" variant='standard'
            onChange={handleMobileChange}
        ></TextField>
    )
}

export default MobileInput