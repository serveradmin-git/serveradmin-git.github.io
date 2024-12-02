


import { TextField } from '@mui/material';
import React from 'react';

const SubjectInput = ({ subject, onChange }) => {
    const handleInputChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <TextField
            label="Subject*"
            variant="standard"
            value={subject}
            onChange={handleInputChange}
        />
    );
};

export default SubjectInput;
