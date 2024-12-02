


import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const ActionCode = ({ onChange, dataArray }) => {
    const [actionSelect, setActionSelect] = React.useState('');

    const handleChange = (event) => {
        const actionId = event.target.value;
        setActionSelect(actionId); // Update selected action code ID
        onChange(actionId); // Call parent onChange function with selected action ID
    };

    return (
        <FormControl variant="standard" sx={{ m: 1, width: "95%" }}>
            <InputLabel id="demo-simple-select-standard-label">Action Code</InputLabel>
            <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Module*"
                value={actionSelect} // Bind value to actionSelect state
                onChange={handleChange} // Handle change event
            >
                {dataArray.map((action) => (
                    <MenuItem key={action.name_value_list.id.value} value={action.name_value_list.id.value}>
                        {action.name_value_list.name.value}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default ActionCode;
