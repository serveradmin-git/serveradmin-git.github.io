import { TextField } from '@mui/material'
import React from 'react'

const AccountInput = ({ onChange }) => {

    const handleAmountChange = (event) => {
        const amount = event.target.value;
        onChange(amount);
    };
    return (
        <TextField label="Account*" variant='standard'

            onChange={handleAmountChange}

        ></TextField>
    )
}

export default AccountInput