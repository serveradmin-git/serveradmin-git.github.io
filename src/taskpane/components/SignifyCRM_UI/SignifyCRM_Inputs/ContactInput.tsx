import { TextField } from '@mui/material'
import React, { useState } from 'react'
import GetName from '../../../Utilty/GetName';

const ContactInput = ({ onChange }) => {


    const { name, setName } = GetName();


    const handleContactChange = (event) => {
        const contactName = event.target.value;
        setName(contactName)
        onChange(contactName);
    };
    return (
        <TextField label="Contact" variant='standard'
            value={name}
            onChange={handleContactChange}
        ></TextField>
    )
}

export default ContactInput