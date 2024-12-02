
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

const CalendarModuleSelect = ({ onChange, value }) => {
    const handleChange = (event) => {
        const moduleSelect = event.target.value;
        onChange(moduleSelect);
    };
    const getModuleName = window.localStorage.getItem("getBeanModule")

    return (
        <>
            <FormControl variant="standard" sx={{ m: 1, width: "94%" }}>
                <InputLabel id="demo-simple-select-standard-label">Module*</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Module*"
                    value={value}
                    onChange={handleChange}
                >
                    <MenuItem value={"Meetings"}>Meeting</MenuItem>
                    <MenuItem value={"Calls"}>Call</MenuItem>
                    <MenuItem value={"Tasks"}>Task</MenuItem>
                </Select>
            </FormControl>
        </>
    )
}

export default CalendarModuleSelect;
