import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import React from 'react'

const IndustrySelect = ({ onChange }) => {
    const [industry, setIndustry] = React.useState('');
    const handleChange = (event: SelectChangeEvent) => {
        const industry = event.target.value
        setIndustry(industry);
        onChange(industry)
    };
    return (
        <>
            <FormControl variant="standard" sx={{ m: 1 }}>
                <InputLabel id="demo-simple-select-standard-label">Industry*</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={industry}
                    onChange={handleChange}
                    label="industry"

                >

                    <MenuItem value={"Restaurant"}>Restaurant</MenuItem>
                    <MenuItem value={"Hotel"}>Hotel</MenuItem>
                    <MenuItem value={"Retail"}>Retail</MenuItem>
                    <MenuItem value={"Agro"}>Agro</MenuItem>
                    <MenuItem value={"Food"}>Food</MenuItem>
                    <MenuItem value={"Consumption"}>Consumption</MenuItem>
                    <MenuItem value={"Fashion"}>Fashion</MenuItem>
                    <MenuItem value={"Home"}>Home</MenuItem>
                    <MenuItem value={"Electronics"}>Electronics</MenuItem>
                    <MenuItem value={"Automobile"}>Automobile</MenuItem>
                    <MenuItem value={"Pharmaceutical"}>Pharmaceutical</MenuItem>
                    <MenuItem value={"Heath"}>Heath</MenuItem>
                    <MenuItem value={"Finance"}>Finance</MenuItem>
                    <MenuItem value={"Insurance"}>Insurance</MenuItem>
                    <MenuItem value={"Education"}>Education</MenuItem>
                    <MenuItem value={"Transportation"}>Transportation</MenuItem>
                    <MenuItem value={"e-Commerce"}>e-Commerce</MenuItem>
                    <MenuItem value={"ICT"}>ICT</MenuItem>
                    <MenuItem value={"Property"}>Property</MenuItem>
                    <MenuItem value={"Construction Materials"}>Construction Materials</MenuItem>
                    <MenuItem value={"Engineering"}>Engineering</MenuItem>
                    <MenuItem value={"Machine"}>Machine</MenuItem>
                    <MenuItem value={"Packaging"}>Packaging</MenuItem>
                    <MenuItem value={"Printing"}>Printing</MenuItem>
                    <MenuItem value={"Energy"}>Energy</MenuItem>
                    <MenuItem value={"Petrochemical"}>Petrochemical</MenuItem>
                    <MenuItem value={"Non-Profit"}>Non-Profit</MenuItem>
                    <MenuItem value={"Government"}>Government</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>

                </Select>
            </FormControl>
        </>
    )
}

export default IndustrySelect