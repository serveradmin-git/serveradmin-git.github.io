import { TextField } from '@mui/material'
import React from 'react'

const OfficePhoneInput = ({ onChange }) => {

    const handleInputChange = (event) => {
        const officePhone = event.target.value;
        onChange(officePhone);
    };

    return (
        <TextField label="Office Phone" variant='standard'
            onChange={handleInputChange}
        ></TextField>
    )
}

export default OfficePhoneInput