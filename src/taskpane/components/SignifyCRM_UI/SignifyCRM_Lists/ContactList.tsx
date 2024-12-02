import { Button, ListItem, ListItemButton, ListItemText, FormLabel } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RedirectContact_URL } from '../../../Oauth/Redirect_URL'

const ContactList = ({ contacts, totalCount }) => {

    const navigate = useNavigate();

    const navigateToCreateContact = () => {
        navigate('/ContactFilter');
    };
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
                        <Button onClick={navigateToCreateContact} sx={{ color: "#6074ac" }}>View More</Button>
                    </ListItemButton>
                </ListItem>
            ))}

        </>
    )
}

export default ContactList