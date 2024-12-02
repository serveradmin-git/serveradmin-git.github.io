
import { TextField } from '@mui/material';
import React from 'react';

const CalendarEmailInput = ({ value, onChange }) => {
    const handleEmailChange = (e) => {
        onChange(e.target.value); // Call the onChange prop with the new email value
    };

    return (
        <>
            <TextField
                value={value}
                onChange={handleEmailChange}
                id="standard-basic"
                label="Email*"
                variant="standard"
            />
        </>
    );
};

export default CalendarEmailInput;
