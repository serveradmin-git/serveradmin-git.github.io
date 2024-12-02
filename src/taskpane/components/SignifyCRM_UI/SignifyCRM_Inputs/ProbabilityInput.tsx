import { TextField } from '@mui/material'
import React from 'react'

const ProbabilityInput = ({ value, onChange }) => {

    const handleInputChange = (event) => {
        const probability = event.target.value;
        onChange(probability);
    };
    return (
        <TextField label="Probability (%)" variant='standard'

            value={value}
            onChange={handleInputChange}

        ></TextField>
    )
}

export default ProbabilityInput