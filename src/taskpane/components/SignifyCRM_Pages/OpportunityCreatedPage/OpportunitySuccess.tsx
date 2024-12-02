

import React, { useState } from 'react';
import { ListItem, ListItemButton, ListItemText, FormLabel, Button } from '@mui/material';
import { ArchiveOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import GetEmailBody from '../../../Utilty/GetEmailBody';
import Navbar from '../Navbar';
import OpportunityArchiveAPI from '../../../Services/Signify_API/OpportunityArchiveAPI';
import Toast from '../../../SignifyToast/Toast';
import { SuccessRedirectOpportunity_URL } from '../../../Oauth/Redirect_URL';
import { getOppertunitId } from '../CreateOpportunityPage/CreateOpportunity';

const OpportunitySuccess = () => {
    const { getName } = GetEmailBody();
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastSeverity, setToastSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    const createdOppertunityId = getOppertunitId(); // Assuming this function retrieves the opportunity ID

    const handleArchiveClick = async () => {
        try {
            await OpportunityArchiveAPI(createdOppertunityId);
            setToastMessage('Opportunity archived successfully!');
            setToastSeverity('success');
            setToastOpen(true);
        } catch (error) {
            setToastMessage(`Failed to archive opportunity: ${error.message}`);
            setToastSeverity('error');
            setToastOpen(true);
        }
    };

    const successredirectOpportunityURL = SuccessRedirectOpportunity_URL();

    const handleOpportunityURLClick = () => {
        // Open the URL in a new tab
        window.open(successredirectOpportunityURL, '_blank');
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
            <p style={{ color: "green", paddingLeft: "15px" }}>An Opportunity has been created successfully</p>
            <FormLabel sx={{ ml: 2, color: "black", fontWeight: "bold" }}>Opportunity</FormLabel>
            <ListItem>
                <ListItemButton>
                    <ListItemText sx={{ color: "Blue" }} primary={getName} onClick={handleOpportunityURLClick} />
                    <ArchiveOutlined onClick={handleArchiveClick} />
                </ListItemButton>
            </ListItem>
            <Link to="/Home">
                <Button variant="contained" sx={{ m: 2 }}>Back to Home</Button>
            </Link>
        </>
    );
}

export default OpportunitySuccess;
