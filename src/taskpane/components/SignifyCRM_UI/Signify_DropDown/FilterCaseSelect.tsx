
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { CaseFilterAPI } from '../../../Services/Signify_API/CaseFilterAPI';

export default function FilterCaseSelect({ onFilterChange }) {
    const [filter, setFilter] = React.useState('');


    const handleChange = (event: SelectChangeEvent) => {
        const selectedFilter = event.target.value as string;
        setFilter(selectedFilter);
        onFilterChange(selectedFilter);
        if (event.target.value === 'Show Open Cases') {
            caseFilter();
        }
    };

    const caseFilter = () => {
        CaseFilterAPI();
    };
    return (
        <Box sx={{ m: 1 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filter}
                    label="Cases"
                    onChange={handleChange}
                >
                    <MenuItem value={"Show Open Cases"}>Show Open Cases</MenuItem>
                    <MenuItem value={"Show Closed Cases"}>Show Closed Cases</MenuItem>
                    <MenuItem value={"Show All Cases"}>Show All Cases</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
