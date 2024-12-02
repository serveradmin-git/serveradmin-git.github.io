import React, { useState } from 'react';
import { ListItem, ListItemButton, ListItemText, FormLabel } from '@mui/material';
import { ArchiveOutlined } from '@mui/icons-material';
import LeadArchiveAPI from '../../../Services/Signify_API/LeadArchiveAPI';
import { RedirectLead_URL } from '../../../Oauth/Redirect_URL';
import Toast from '../../../SignifyToast/Toast';

const LeadList = ({ leads, totalCount }) => {

    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastSeverity, setToastSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');


    const handleLeadArchiveClick = async (id) => {



        try {
            await LeadArchiveAPI(id);
            setToastMessage('Lead archived successfully!');
            setToastSeverity('success');
            setToastOpen(true);
        } catch (error) {
            setToastMessage(`Failed to archive lead: ${error.message}`);
            setToastSeverity('error');
            setToastOpen(true);
        }
    };


    const redirectLeadURL = RedirectLead_URL()

    const handleLeadURLClick = (id) => {
        // Open the URL in a new tab
        window.open(redirectLeadURL + id, '_blank');
    };


    const handleCloseToast = () => {
        setToastOpen(false);
    };


    return (
        <>


            <Toast
                open={toastOpen}
                message={toastMessage}
                severity={toastSeverity}
                onClose={handleCloseToast}
            />
            <FormLabel sx={{ ml: 2, color: "black", fontWeight: "bold" }}> Leads ({totalCount})</FormLabel>
            {leads.map((lead) => (
                <ListItem key={lead.id.value}>
                    <ListItemButton>
                        <ListItemText onClick={() => handleLeadURLClick(lead.name_value_list.id.value)} sx={{ color: "Blue" }} primary={`${lead.name_value_list.first_name.value} ${lead.name_value_list.last_name.value}`} />
                        <ArchiveOutlined onClick={() => handleLeadArchiveClick(lead.name_value_list.id.value)} />
                    </ListItemButton>
                </ListItem>
            ))}
        </>
    );
}

export default LeadList;
