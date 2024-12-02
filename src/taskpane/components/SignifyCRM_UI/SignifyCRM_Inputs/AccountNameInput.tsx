import { TextField } from '@mui/material'
import React from 'react'
import { GetAccountNameValue } from '../../../Utilty/GetCreateLeadValue'
import GetName from '../../../Utilty/GetName';

const AccountNameInput = ({ onChange, value }) => {
    const handleNameChange = (e) => {
        onChange(e.target.value); // Call the onChange prop with the new name value
    };

    return (
        <TextField
            value={value}
            onChange={handleNameChange}
            id="standard-basic"
            label="Name*"
            variant="standard"
        />
    );
}

export default AccountNameInput