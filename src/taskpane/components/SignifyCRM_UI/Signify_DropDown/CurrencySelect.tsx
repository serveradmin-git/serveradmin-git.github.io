
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { GetUserData } from '../../../Oauth/GetUserData';

const CurrencySelect = ({ currencyName }) => {
    // const userCurrencyName = getUserLoginCurrency();
    const { userCurrencyName } = GetUserData();
    const [selectedCurrency, setSelectedCurrency] = useState('');

    useEffect(() => {
        const selectedCurrencyId = currencyName.find(currency => currency.name === userCurrencyName)?.id || '';
        setSelectedCurrency(selectedCurrencyId);
        localStorage.setItem('Currecy_ID', (selectedCurrencyId))
    }, [userCurrencyName, currencyName]);

    const handleChange = (event) => {
        setSelectedCurrency(event.target.value);
        const Currecy_Id = event.target.value
        localStorage.setItem('Currecy_ID', (Currecy_Id))


    };

    return (
        <>
            <FormControl variant="standard" sx={{ m: 1 }}>
                <InputLabel id="demo-simple-select-standard-label">Currency</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={selectedCurrency}
                    onChange={handleChange}
                    label="Currency"
                >
                    {currencyName.map(currency => (
                        <MenuItem key={currency.id} value={currency.id}>{currency.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
}

export default CurrencySelect;

