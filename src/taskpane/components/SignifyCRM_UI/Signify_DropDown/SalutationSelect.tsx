import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import React from 'react'

const SalutationSelect = ({ onChange }) => {
    const [salutation, setSalutation] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        const salutation = event.target.value
        setSalutation(salutation);
        onChange(salutation)
    };
    return (

        <>

            <FormControl variant="standard" sx={{ m: 1 }}>
                <InputLabel id="demo-simple-select-standard-label">Salutation</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={salutation}
                    onChange={handleChange}
                    label="Salutation"

                >

                    <MenuItem value={"K."}>K.</MenuItem>
                    <MenuItem value={"Mr."}>Mr.</MenuItem>
                    <MenuItem value={"Ms."}>Ms.</MenuItem>
                    <MenuItem value={"Mrs."}>Mrs.</MenuItem>
                    <MenuItem value={"Dr."}>Dr.</MenuItem>
                    <MenuItem value={"Prof."}>Prof.</MenuItem>
                    <MenuItem value={"Asst."}>Asst.</MenuItem>

                </Select>
            </FormControl>

        </>
    )
}

export default SalutationSelect