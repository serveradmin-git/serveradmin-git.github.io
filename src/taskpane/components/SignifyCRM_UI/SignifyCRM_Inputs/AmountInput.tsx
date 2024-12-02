import { TextField } from '@mui/material'
import React from 'react'

const AmountInput = ({ onChange }) => {



    const handleAmountChange = (event) => {
        const amount = event.target.value;
        onChange(amount);
    };

    return (

        <TextField label="Amount*" variant='standard'

            onChange={handleAmountChange}


        ></TextField>
    )
}

export default AmountInput