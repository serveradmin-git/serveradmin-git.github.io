
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

const CalendarStatusSelect = ({ value, onChange }) => {
    const handleChange = (event) => {
        const status = event.target.value;
        onChange(status);
    };

    return (
        <>
            <FormControl variant="standard" sx={{ m: 1, width: "94%" }}>
                <InputLabel id="demo-simple-select-standard-label">Status*</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Status*"
                    value={value}
                    onChange={handleChange}
                >
                    <MenuItem value={"Planned"}>Planned</MenuItem>
                    <MenuItem value={"Held"}>Held</MenuItem>
                    <MenuItem value={"Not-Held"}>Not Held</MenuItem>
                </Select>
            </FormControl>
        </>
    );
};

export default CalendarStatusSelect;
