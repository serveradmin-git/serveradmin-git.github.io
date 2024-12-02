import { ArchiveOutlined } from '@mui/icons-material'
import { Button, FormLabel, ListItem, ListItemButton, ListItemText } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import GetEmailBody from '../../../Utilty/GetEmailBody'
import Navbar from '../Navbar'
import { SuccessRedirectContact_URL } from '../../../Oauth/Redirect_URL'
import Toast from '../../../SignifyToast/Toast'
import ContactArchiveAPI from '../../../Services/Signify_API/ContactArchiveAPI'

const ContactSuccess = () => {
    const { getName } = GetEmailBody();
    const successredirectContactURL = SuccessRedirectContact_URL();
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastSeverity, setToastSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');

    const handleContactURLClick = () => {
        // Open the URL in a new tab
        window.open(successredirectContactURL, '_blank');
    };
    const handleArchiveClick = async () => {
        try {
            await ContactArchiveAPI();
            setToastMessage('Contact archived successfully!');
            setToastSeverity('success');
            setToastOpen(true);
        } catch (error) {
            setToastMessage(`Failed to archive lead: ${error.message}`);
            setToastSeverity('error');
            setToastOpen(true);
        }
    };
    const handleCloseToast = () => {
        setToastOpen(false);
    };
    return (
        <>
            <Navbar />
            <Toast
                open={toastOpen}
                message={toastMessage}
                severity={toastSeverity}
                onClose={handleCloseToast}
            />
            <p style={{ color: "green", paddingLeft: "15px" }}>A Contact has been created successfully</p>
            <FormLabel sx={{ ml: 2, color: "black", fontWeight: "bold" }}>Contact</FormLabel>
            <ListItem >
                <ListItemButton>
                    <ListItemText sx={{ color: "Blue" }} primary={getName} onClick={handleContactURLClick} />
                    <ArchiveOutlined onClick={handleArchiveClick} />
                </ListItemButton>
            </ListItem>
            <Link to="/Home">
                <Button variant="contained" sx={{ m: 2 }}>Back to Home</Button>
            </Link>
        </>
    )
}

export default ContactSuccess