


import React, { useState } from 'react';
import { ListItem, ListItemButton, ListItemText, FormLabel, Button } from '@mui/material';
import { ArchiveOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import GetEmailBody from '../../../Utilty/GetEmailBody';
import Navbar from '../Navbar';
import { SuccessRedirectAccount_URL } from '../../../Oauth/Redirect_URL';
import AccountArchiveAPI from '../../../Services/Signify_API/AccountArchiveAPI';
import Toast from '../../../SignifyToast/Toast';

const AccountSuccess = () => {
    const { getName } = GetEmailBody();
    const successredirectAccountURL = SuccessRedirectAccount_URL();
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastSeverity, setToastSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');

    const handleArchiveClick = async () => {
        try {
            await AccountArchiveAPI();
            setToastMessage('Account archived successfully!');
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

    const handleAccountURLClick = () => {
        // Open the URL in a new tab
        window.open(successredirectAccountURL, '_blank');
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
            <p style={{ color: "green", paddingLeft: "15px" }}>An account has been created successfully</p>
            <FormLabel sx={{ ml: 2, color: "black", fontWeight: "bold" }}>Account</FormLabel>
            <ListItem>
                <ListItemButton >
                    <ListItemText sx={{ color: "blue" }} primary={getName} onClick={handleAccountURLClick} />
                    <ArchiveOutlined onClick={handleArchiveClick} />
                </ListItemButton>
            </ListItem>
            <Link to="/Home">
                <Button variant="contained" sx={{ m: 2 }}>Back to Home</Button>
            </Link>
        </>
    );
};

export default AccountSuccess;

