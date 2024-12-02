import { Button, ListItem, ListItemButton, ListItemText, FormLabel } from '@mui/material'
import React from 'react'
import GetName from '../../../Utilty/GetName'
import { useNavigate } from 'react-router-dom'
import { RedirectContact_URL } from '../../../Oauth/Redirect_URL'
let getContactList;
export const CalendarContactList = ({ contacts, totalCount }) => {

    const navigate = useNavigate();




    const handleSelectContact = (id, firstName, lastName, module) => {
        const name = `${firstName} ${lastName}`;
        const selectContact = {
            Id: id,
            Name: name,
            Module: module
        }
        getContactList = selectContact;
        navigate('/CalendarHome', { state: { listVaue: selectContact } });
    }




    const redirectContactURL = RedirectContact_URL()

    const handleContactURLClick = (id) => {
        // Open the URL in a new tab
        window.open(redirectContactURL + id, '_blank');
    };

    return (
        <>
            <FormLabel sx={{ ml: 2, color: "black", fontWeight: "bold" }}>Contacts ({totalCount})</FormLabel>
            {contacts.map((contact) => (
                <ListItem key={contact.id.value} >
                    <ListItemButton>
                        <ListItemText sx={{ color: "Blue" }} primary={`${contact.name_value_list.first_name.value} ${contact.name_value_list.last_name.value}`} onClick={() => handleContactURLClick(contact.name_value_list.id.value)} />
                        <Button variant="outlined" onClick={() => handleSelectContact(contact.name_value_list.id.value, contact.name_value_list.first_name.value, contact.name_value_list.last_name.value, contact.module_name)} sx={{ color: "#6074ac" }}>Select</Button>
                    </ListItemButton>
                </ListItem>
            ))}

        </>
    )
}



