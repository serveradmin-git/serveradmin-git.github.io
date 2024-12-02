
import { TextField } from '@mui/material';
import React, { useState } from 'react';


const CalendarSubjectInput = ({ subject, onChange, hidden }) => {
    const [subjct, setSubject] = useState(); // Start with an empty object

    const handleChange = (event) => {
        const newSubjectValue = event.target.value;
        setSubject(newSubjectValue); // Update local state with the new value
        onChange(newSubjectValue); // Call onChange with updated subject
    };

    if (hidden) {
        return null; // Render nothing if `hidden` is true
    }


    return (
        <TextField
            sx={{ width: "94%", m: 1 }}
            label="Subject*"
            variant="standard"
            value={subject} // Use the value directly from state
            onChange={handleChange}
        />
    );
};

export default CalendarSubjectInput;