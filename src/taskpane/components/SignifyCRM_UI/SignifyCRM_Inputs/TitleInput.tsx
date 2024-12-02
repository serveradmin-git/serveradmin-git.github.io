import { TextField } from '@mui/material'
import React from 'react'

const TitleInput = ({ onChange }) => {
    const handleInputChange = (event) => {
        const title = event.target.value;
        onChange(title);
    };
    return (
        <TextField label="Title" variant='standard'

            onChange={handleInputChange}
        ></TextField>
    )
}

export default TitleInput