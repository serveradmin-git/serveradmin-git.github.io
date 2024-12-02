



import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';

const ContactSelect = ({ contactNameData }) => {
    const [selectedContact, setSelectedContact] = useState('');
    const handleChange = (event) => {
        setSelectedContact(event.target.value);
        const Contact_Id = event.target.value
        localStorage.setItem('Contact_Id', (Contact_Id))

        // Update formData with selected account name if needed
        const selectedContactName = contactNameData.find(account => account.id === event.target.value)?.name_value_list.first_name.value;
        localStorage.setItem("Contact", selectedContactName)
        // Add your onChange logic here if needed
    };

    return (
        <>
            <FormControl fullWidth variant="standard">
                <InputLabel id="demo-simple-select-standard-label">Contact</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Contact"
                    value={selectedContact}
                    onChange={handleChange}

                >
                    {
                        contactNameData.map(contactName => (
                            <MenuItem key={contactName.id} value={contactName.id}>
                                {contactName.name_value_list.first_name.value}   {contactName.name_value_list.last_name.value}
                            </MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </>
    );
};

export default ContactSelect;

