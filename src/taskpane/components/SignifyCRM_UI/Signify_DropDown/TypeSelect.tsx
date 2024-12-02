
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import React, { useEffect } from 'react';

const TypeSelect = ({ onChange }) => {
    const [type, setType] = React.useState('');

    useEffect(() => {
        onChange(type); // Notify parent component of the default type on mount
    }, []); // Empty dependency array to run only on mount

    const handleChange = (event: SelectChangeEvent) => {
        const newType = event.target.value;
        setType(newType);
        onChange(newType);
    };

    return (
        <FormControl variant="standard" sx={{ m: 1 }}>
            <InputLabel id="demo-simple-select-standard-label">Type*</InputLabel>
            <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-to-select-standard"
                value={type}
                onChange={handleChange}
                label="Type*"
            >
                <MenuItem value={"Customer"}>Customer</MenuItem>
                <MenuItem value={"Partner"}>Partner</MenuItem>
                <MenuItem value={"Prospect"}>Prospect</MenuItem>
                <MenuItem value={"Supplier"}>Supplier</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
        </FormControl>
    );
}

export default TypeSelect;
