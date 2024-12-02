import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import React from 'react'

const StatusSelect = ({ onChange }) => {
    const [status, setStatus] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        const status = event.target.value
        setStatus(status);
        onChange(status)
    };


    return (
        <>
            <FormControl variant="standard" sx={{ m: 1 }}>
                <InputLabel id="demo-simple-select-standard-label">Status*</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={status}
                    onChange={handleChange}
                    label="Status"

                >

                    <MenuItem value={"Active"}>Active</MenuItem>
                    <MenuItem value={"Inactive"}>Inactive</MenuItem>
                    <MenuItem value={"Suspend"}>Suspend</MenuItem>
                    <MenuItem value={"Pending"}>Pending</MenuItem>
                    <MenuItem value={"Collection"}>Collection</MenuItem>
                    <MenuItem value={"Approved"}>Approved</MenuItem>
                    <MenuItem value={"Rejected"}>Rejected</MenuItem>

                </Select>
            </FormControl>
        </>
    )
}

export default StatusSelect