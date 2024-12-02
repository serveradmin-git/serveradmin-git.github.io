
import React, { useState } from 'react';
import { ListItem, ListItemButton, ListItemText, FormLabel, Button } from '@mui/material'
import { ArchiveOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import GetEmailBody from '../../../Utilty/GetEmailBody';
import Navbar from '../Navbar';
import { SuccessRedirectCase_URL } from '../../../Oauth/Redirect_URL';
import Toast from '../../../SignifyToast/Toast';
import CaseArchiveAPI from '../../../Services/Signify_API/CaseArchiveAPI';
import { getCaseId } from '../CreateCasePage/CreateCase';

const CaseSuccess = () => {
    const { getName } = GetEmailBody()
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastSeverity, setToastSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');

    const CaseID = getCaseId()
    const successredirectCaseURL = SuccessRedirectCase_URL();
    const handleCaseURLClick = () => {
        // Open the URL in a new tab
        window.open(successredirectCaseURL, '_blank');
    };
    const handleArchiveClick = async () => {
        try {
            await CaseArchiveAPI(CaseID);
            setToastMessage('Case archived successfully!');
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
            <p style={{ color: "green", paddingLeft: "15px" }}>A Case has been created successfully</p>
            <FormLabel sx={{ ml: 2, color: "black", fontWeight: "bold" }}>Case</FormLabel>
            <ListItem >
                <ListItemButton>
                    <ListItemText sx={{ color: "Blue" }} primary={getName} onClick={handleCaseURLClick} />
                    <ArchiveOutlined onClick={handleArchiveClick} />
                </ListItemButton>
            </ListItem>
            <Link to="/Home">
                <Button variant="contained" sx={{ m: 2 }}>Back to Home</Button>
            </Link>


        </>
    )
}

export default CaseSuccess


