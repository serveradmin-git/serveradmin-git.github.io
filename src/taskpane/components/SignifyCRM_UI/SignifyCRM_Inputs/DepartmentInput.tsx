import { TextField } from '@mui/material'
import React from 'react'

const DepartmentInput = ({ onChange }) => {
    const handleInputChange = (event) => {
        const department = event.target.value;
        onChange(department);
    };
    return (
        <TextField label="Department" variant='standard'

            onChange={handleInputChange}
        ></TextField>
    )
}

export default DepartmentInput