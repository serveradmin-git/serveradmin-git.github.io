


import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';

const AccountSelect = ({ accountNameData }) => {
    const [selectedAccount, setSelectedAccount] = useState('');

    const handleChange = (event) => {
        setSelectedAccount(event.target.value);
        const Account_Id = event.target.value;
        localStorage.setItem('Account_Id', Account_Id);

        // Update formData with selected account name if needed
        const selectedAccountName = accountNameData.find(account => account.id === event.target.value)?.name_value_list.name.value;
        localStorage.setItem("Account", selectedAccountName)
    };


    return (
        <>
            <FormControl fullWidth variant="standard">
                <InputLabel id="demo-simple-select-standard-label">Account*</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Account*"
                    value={selectedAccount}
                    onChange={handleChange}
                >
                    {accountNameData.map((accountName) => (
                        <MenuItem key={accountName.id} value={accountName.id}>
                            {accountName.name_value_list.name.value}
                        </MenuItem>
                    ))}

                </Select>
            </FormControl>
        </>
    );
};

export default AccountSelect;

