

import { TextField } from '@mui/material';
import React from 'react';

const CalendarNameIput = ({ value, onChange }) => {
    const handleNameChange = (e) => {
        onChange(e.target.value); // Call the onChange prop with the new name value
    };

    return (
        <TextField
            value={value}
            onChange={handleNameChange}
            id="standard-basic"
            label="Name*"
            variant="standard"
        />
    );
};

export default CalendarNameIput;
