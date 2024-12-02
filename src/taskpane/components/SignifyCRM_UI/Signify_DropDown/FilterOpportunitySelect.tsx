

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { OpportunityFilterAPI } from '../../../Services/Signify_API/OpportunityFilterAPI';
import { AllOpportunityFilterAPI } from '../../../Services/Signify_API/AllOpportunityFilterAPI';

export default function FilterOpportunitySelect({ onFilterChange }) {
    const [filter, setFilter] = React.useState('');


    const handleChange = (event: SelectChangeEvent) => {
        const selectedFilter = event.target.value as string;
        setFilter(selectedFilter);
        onFilterChange(selectedFilter);
        if (event.target.value === 'Show Active Opportunity') {
            opportunityFilter();
        }
        else if (event.target.value === 'Show All Opportunity') {
            allOpportunityFilter();
        }
    };

    const opportunityFilter = () => {
        OpportunityFilterAPI();
    };
    const allOpportunityFilter = () => {
        AllOpportunityFilterAPI();
    };

    return (
        <Box sx={{ m: 1, marginTop: "33px" }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filter}
                    label="Cases"
                    onChange={handleChange}
                >
                    <MenuItem value={"Show All Opportunity"} >Show All Opportunity</MenuItem>
                    <MenuItem value={"Show Active Opportunity"}>Show Active Opportunity</MenuItem>
                    <MenuItem value={"Show Closed Won Opportunity"}>Show Closed Won Opportunity</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
