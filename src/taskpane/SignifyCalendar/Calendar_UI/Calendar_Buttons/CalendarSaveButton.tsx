import { Button } from '@mui/material';
import React from 'react';

const CalendarSaveButton = ({ onClick }) => {

    return (
        <div style={{ display: "flex", justifyContent: "end" }}>
            <Button variant='contained' sx={{ background: "#6074ac", width: "40%" }} onClick={onClick}>
                Save
            </Button>
        </div>

    );
};

export default CalendarSaveButton;
