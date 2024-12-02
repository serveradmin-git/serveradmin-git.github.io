import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import React from 'react'

const SaleStageSelect = ({ value, onChange }) => {
    const [saleStage, seSaleStage] = React.useState('');
    const handleChange = (event: SelectChangeEvent) => {
        const saleStage = event.target.value
        seSaleStage(saleStage);
        onChange(saleStage)
    };
    return (

        <>
            <FormControl variant="standard" sx={{ m: 1 }}>
                <InputLabel id="demo-simple-select-standard-label">Sales Stage*</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={value}
                    onChange={handleChange}
                    label="Sales Stage"

                >

                    <MenuItem value={"Prospecting"} >Prospecting</MenuItem>
                    <MenuItem value={"Qualification"}>Qualification</MenuItem>
                    <MenuItem value={"Proposal/Price Quote"}>Proposal/Price Quote</MenuItem>
                    <MenuItem value={"Negotation/Review"}>Negotation/Review</MenuItem>
                    <MenuItem value={"Closed-Won"}>Closed Won</MenuItem>
                    <MenuItem value={"Closed-Lost"}>Closed Lost</MenuItem>
                    <MenuItem value={"Postponed"}>Postponed</MenuItem>
                    <MenuItem value={"Cancelled"}>Cancelled</MenuItem>

                </Select>
            </FormControl>
        </>
    )
}

export default SaleStageSelect